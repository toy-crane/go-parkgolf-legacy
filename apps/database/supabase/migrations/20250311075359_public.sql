

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."game_status" AS ENUM (
    'draft',
    'in_progress',
    'completed',
    'deleted'
);


ALTER TYPE "public"."game_status" OWNER TO "postgres";


COMMENT ON TYPE "public"."game_status" IS '게임의 등록 상태를 표현합니다.';



CREATE TYPE "public"."publish_status" AS ENUM (
    'draft',
    'completed'
);


ALTER TYPE "public"."publish_status" OWNER TO "postgres";


COMMENT ON TYPE "public"."publish_status" IS '골프코스 데이터 입력 상태를 의미합니다.';



CREATE TYPE "public"."scraped_status" AS ENUM (
    'draft',
    'completed'
);


ALTER TYPE "public"."scraped_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_profile_on_signup"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
	INSERT INTO public.profiles(id, name, username, avatar_url)
	VALUES (
		new.id,
		new.raw_user_meta_data ->>'name',
		new.raw_user_meta_data ->>'user_name',
		new.raw_user_meta_data ->>'avatar_url'
	);
	RETURN new;
end;$$;


ALTER FUNCTION "public"."create_profile_on_signup"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_user"() RETURNS "void"
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
   delete from auth.users where id = auth.uid();
$$;


ALTER FUNCTION "public"."delete_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_game_summary"("input_game_id" "uuid") RETURNS TABLE("game_player_id" "uuid", "player_name" "text", "game_course" "text", "total_score" bigint)
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
  SELECT
    p.id AS game_player_id,
    p.nickname AS player_name,
    c.name AS game_course,
    SUM(s.score) AS total_score
  FROM
    games g
    JOIN game_courses c ON g.id = c.game_id
    JOIN game_scores gs ON c.id = gs.game_course_id
    JOIN game_player_scores s ON gs.id = s.game_score_id
    JOIN game_players p ON s.game_player_id = p.id
  WHERE
    g.id = input_game_id  -- Use the parameter with a distinct name
  GROUP BY
    p.id,
    p.nickname,
    c.name
  ORDER BY
    p.created_at asc,
    c.name;
END;$$;


ALTER FUNCTION "public"."get_game_summary"("input_game_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_region_1depth_count"() RETURNS TABLE("region_1depth_name" character varying, "count" bigint)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY 
    SELECT lot_number_addresses.region_1depth_name, COUNT(*)
    FROM lot_number_addresses
    GROUP BY lot_number_addresses.region_1depth_name
    order by region_1depth_name;
END
$$;


ALTER FUNCTION "public"."get_region_1depth_count"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_region_2depth_count"("region_1depth_name" character varying) RETURNS TABLE("region_2depth_name" character varying, "count" bigint)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        lot_number_addresses.region_2depth_name,
        COUNT(*) AS count
    FROM 
        lot_number_addresses
    WHERE 
        lot_number_addresses.region_1depth_name = get_region_2depth_count.region_1depth_name
    GROUP BY 
        lot_number_addresses.region_2depth_name
    ORDER BY 
        lot_number_addresses.region_2depth_name;
END;
$$;


ALTER FUNCTION "public"."get_region_2depth_count"("region_1depth_name" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_region_2depth_counts"("region_1depth_name" "text") RETURNS TABLE("region_2depth_name" "text", "count" integer)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        lot_number_addresses.region_2depth_name,
        COUNT(*) AS count
    FROM 
        lot_number_addresses
    WHERE 
        lot_number_addresses.region_1depth_name = get_region_counts.region_1depth_name
    GROUP BY 
        lot_number_addresses.region_2depth_name
    ORDER BY 
        lot_number_addresses.region_2depth_name;
END;
$$;


ALTER FUNCTION "public"."get_region_2depth_counts"("region_1depth_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_courses"("data" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    course_data jsonb;
    hole_data jsonb;
    new_course_id uuid;
BEGIN
    -- courses 배열을 반복 처리
    FOR course_data IN SELECT * FROM jsonb_array_elements(data->'courses')
    LOOP
        -- courses 테이블에 데이터 삽입. description이 없는 경우 NULL로 처리
        INSERT INTO courses (golf_course_id, name, description)
        VALUES ((data->>'golf_course_id')::uuid, course_data->>'name', NULL)
        RETURNING id INTO new_course_id;

        -- holes 배열 데이터를 반복 처리
        FOR hole_data IN SELECT * FROM jsonb_array_elements(course_data->'holes')
        LOOP
            -- holes 테이블에 데이터 삽입
            INSERT INTO holes (course_id, hole_number, par, distance)
            VALUES (new_course_id, (hole_data->>'hole_number')::smallint, (hole_data->>'par')::smallint, (hole_data->>'distance')::float);
        END LOOP;
    END LOOP;
END;
$$;


ALTER FUNCTION "public"."insert_courses"("data" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."nearby_golf_courses"("latitude" double precision, "longitude" double precision, "max_results" integer) RETURNS TABLE("id" "uuid", "created_at" timestamp with time zone, "name" "text", "hole_count" smallint, "slug" "text", "lot_number_address_name" "text", "road_address_name" "text", "lng" double precision, "lat" double precision, "publish_status" "public"."publish_status", "location" "extensions"."geography", "dist_meters" double precision)
    LANGUAGE "sql"
    AS $$
  select 
    gc.id, gc.created_at, gc.name, gc.hole_count, gc.slug, 
    gc.lot_number_address_name, gc.road_address_name, gc.lng, gc.lat, 
    gc.publish_status, gc.location,
    st_distance(gc.location, st_point(longitude, latitude)::geography) as dist_meters -- 거리 계산
  from 
    public.golf_courses gc
  where gc.location is not null
  order by gc.location <-> st_point(longitude, latitude)::geography
  limit max_results;
$$;


ALTER FUNCTION "public"."nearby_golf_courses"("latitude" double precision, "longitude" double precision, "max_results" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."courses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "golf_course_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text"
);


ALTER TABLE "public"."courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."game_courses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "hole_count" integer NOT NULL,
    "game_id" "uuid" NOT NULL
);


ALTER TABLE "public"."game_courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."game_player_scores" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "score" integer NOT NULL,
    "game_player_id" "uuid" NOT NULL,
    "game_score_id" "uuid" NOT NULL
);


ALTER TABLE "public"."game_player_scores" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."game_players" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "nickname" "text" NOT NULL,
    "game_id" "uuid" NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."game_players" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."game_scores" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "hole_number" integer NOT NULL,
    "game_course_id" "uuid" NOT NULL,
    "par" integer NOT NULL
);


ALTER TABLE "public"."game_scores" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."games" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "status" "public"."game_status" DEFAULT 'draft'::"public"."game_status" NOT NULL,
    "golf_course_id" "uuid" NOT NULL,
    "finished_at" timestamp with time zone
);


ALTER TABLE "public"."games" OWNER TO "postgres";


COMMENT ON COLUMN "public"."games"."status" IS '게임의 진행 상태를 나타냅니다';



CREATE TABLE IF NOT EXISTS "public"."golf_course_qnas" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "golf_course_id" "uuid" NOT NULL,
    "parent_id" "uuid",
    "content" "text" NOT NULL,
    "level" smallint DEFAULT '0'::smallint NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."golf_course_qnas" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."golf_course_reviews" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "course_condition_rating" smallint NOT NULL,
    "course_difficulty_rating" smallint NOT NULL,
    "facilities_rating" smallint NOT NULL,
    "text" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "golf_course_id" "uuid" NOT NULL
);


ALTER TABLE "public"."golf_course_reviews" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."golf_courses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "hole_count" smallint NOT NULL,
    "slug" "text" NOT NULL,
    "lot_number_address_name" "text" NOT NULL,
    "road_address_name" "text",
    "lng" double precision NOT NULL,
    "lat" double precision NOT NULL,
    "publish_status" "public"."publish_status" DEFAULT 'draft'::"public"."publish_status" NOT NULL,
    "location" "extensions"."geography"(Point,4326),
    "phone_number" "text",
    "opening_hours" "text",
    "regular_closed_days" "text",
    "website" "text",
    "registration_method" "text"
);


ALTER TABLE "public"."golf_courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."holes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "course_id" "uuid" NOT NULL,
    "hole_number" smallint NOT NULL,
    "par" smallint NOT NULL,
    "distance" real
);


ALTER TABLE "public"."holes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lot_number_addresses" (
    "address_name" character varying(255),
    "b_code" character varying(20),
    "h_code" character varying(20),
    "main_address_no" character varying(10),
    "mountain_yn" character(1),
    "region_1depth_name" character varying(100) NOT NULL,
    "region_2depth_name" character varying(100),
    "region_3depth_h_name" character varying(100),
    "region_3depth_name" character varying(100),
    "sub_address_no" character varying(10),
    "x" double precision,
    "y" double precision,
    "golf_course_id" "uuid" NOT NULL,
    CONSTRAINT "lot_number_addresses_mountain_yn_check" CHECK (("mountain_yn" = ANY (ARRAY['N'::"bpchar", 'Y'::"bpchar"])))
);


ALTER TABLE "public"."lot_number_addresses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "username" "text" NOT NULL,
    "avatar_url" "text" NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."road_addresses" (
    "address_name" character varying(255),
    "building_name" character varying(255),
    "main_building_no" character varying(10),
    "region_1depth_name" character varying(100),
    "region_2depth_name" character varying(100),
    "region_3depth_name" character varying(100),
    "road_name" character varying(255),
    "sub_building_no" character varying(10),
    "underground_yn" character(1),
    "x" double precision,
    "y" double precision,
    "zone_no" character varying(10),
    "golf_course_id" "uuid" NOT NULL,
    CONSTRAINT "road_addresses_underground_yn_check1" CHECK (("underground_yn" = ANY (ARRAY['N'::"bpchar", 'Y'::"bpchar"])))
);


ALTER TABLE "public"."road_addresses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."scraped_golf_courses" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "address" "text" NOT NULL,
    "hole_count" integer NOT NULL,
    "status" "public"."scraped_status" DEFAULT 'draft'::"public"."scraped_status"
);


ALTER TABLE "public"."scraped_golf_courses" OWNER TO "postgres";


ALTER TABLE "public"."scraped_golf_courses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."scraped_golf_courses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."tournaments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "golf_course_id" "uuid" NOT NULL,
    "number_of_participants" integer NOT NULL,
    "registration_fee" "text",
    "host" "text" NOT NULL,
    "organizer" "text" NOT NULL,
    "sponsor" "text" NOT NULL,
    "registration_start_date" "date",
    "registration_end_date" "date",
    "recruitment_detail_url" "text" NOT NULL,
    "eligibility_criteria" "text"
);


ALTER TABLE "public"."tournaments" OWNER TO "postgres";


COMMENT ON TABLE "public"."tournaments" IS '파크골프 대회';



COMMENT ON COLUMN "public"."tournaments"."eligibility_criteria" IS '참가 자격';



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."game_courses"
    ADD CONSTRAINT "game_courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."game_player_scores"
    ADD CONSTRAINT "game_player_scores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."game_player_scores"
    ADD CONSTRAINT "game_player_scores_unique_combination" UNIQUE ("game_player_id", "game_score_id");



ALTER TABLE ONLY "public"."game_players"
    ADD CONSTRAINT "game_players_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."game_scores"
    ADD CONSTRAINT "game_scores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."games"
    ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."golf_course_qnas"
    ADD CONSTRAINT "golf_course_qnas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."golf_course_reviews"
    ADD CONSTRAINT "golf_course_reviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."golf_courses"
    ADD CONSTRAINT "golf_courses_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."golf_courses"
    ADD CONSTRAINT "golf_courses_pkey1" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."golf_courses"
    ADD CONSTRAINT "golf_courses_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."holes"
    ADD CONSTRAINT "holes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lot_number_addresses"
    ADD CONSTRAINT "lot_number_addresses_pkey" PRIMARY KEY ("golf_course_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."road_addresses"
    ADD CONSTRAINT "road_addresses_pkey1" PRIMARY KEY ("golf_course_id");



ALTER TABLE ONLY "public"."scraped_golf_courses"
    ADD CONSTRAINT "scraped_golf_courses_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."scraped_golf_courses"
    ADD CONSTRAINT "scraped_golf_courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tournaments"
    ADD CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "unique_course_name_golf_course_id" UNIQUE ("name", "golf_course_id");



ALTER TABLE ONLY "public"."golf_course_reviews"
    ADD CONSTRAINT "unique_golf_course_user" UNIQUE ("golf_course_id", "user_id");



ALTER TABLE ONLY "public"."scraped_golf_courses"
    ADD CONSTRAINT "unique_name_address_hole_count" UNIQUE ("name", "address", "hole_count");



CREATE INDEX "golf_course_geo_index" ON "public"."golf_courses" USING "gist" ("location");



CREATE INDEX "idx_slug" ON "public"."golf_courses" USING "btree" ("slug");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_courses"
    ADD CONSTRAINT "game_courses_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_player_scores"
    ADD CONSTRAINT "game_player_scores_game_player_id_fkey" FOREIGN KEY ("game_player_id") REFERENCES "public"."game_players"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_player_scores"
    ADD CONSTRAINT "game_player_scores_game_score_id_fkey" FOREIGN KEY ("game_score_id") REFERENCES "public"."game_scores"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_players"
    ADD CONSTRAINT "game_players_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_players"
    ADD CONSTRAINT "game_players_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_scores"
    ADD CONSTRAINT "game_scores_game_course_id_fkey" FOREIGN KEY ("game_course_id") REFERENCES "public"."game_courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."games"
    ADD CONSTRAINT "games_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."games"
    ADD CONSTRAINT "games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."golf_course_qnas"
    ADD CONSTRAINT "golf_course_qnas_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."golf_course_qnas"
    ADD CONSTRAINT "golf_course_qnas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."golf_course_reviews"
    ADD CONSTRAINT "golf_course_reviews_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."golf_course_reviews"
    ADD CONSTRAINT "golf_course_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."holes"
    ADD CONSTRAINT "holes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."lot_number_addresses"
    ADD CONSTRAINT "lot_number_addresses_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tournaments"
    ADD CONSTRAINT "public_tournaments_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."road_addresses"
    ADD CONSTRAINT "road_addresses_golf_course_id_fkey" FOREIGN KEY ("golf_course_id") REFERENCES "public"."golf_courses"("id") ON DELETE CASCADE;



CREATE POLICY "Enable delete for users based on user_id" ON "public"."games" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."golf_course_reviews" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."courses" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."game_courses" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."game_players" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."game_scores" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."holes" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."scraped_golf_courses" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."game_player_scores" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."games" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."golf_course_reviews" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."golf_courses" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."lot_number_addresses" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."road_addresses" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."courses" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."game_courses" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."game_player_scores" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."game_players" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."game_scores" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."golf_course_reviews" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."golf_courses" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."holes" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."lot_number_addresses" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."road_addresses" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."scraped_golf_courses" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."tournaments" FOR SELECT USING (true);



CREATE POLICY "Enable update for users" ON "public"."scraped_golf_courses" FOR UPDATE USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for users based on email" ON "public"."game_player_scores" FOR UPDATE USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for users based on email" ON "public"."game_scores" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for users based on email" ON "public"."games" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."golf_course_reviews" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "User can see all games" ON "public"."games" FOR SELECT USING (true);



ALTER TABLE "public"."courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."game_courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."game_player_scores" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."game_players" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."game_scores" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."games" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."golf_course_reviews" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."golf_courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."holes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."lot_number_addresses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."road_addresses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."scraped_golf_courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tournaments" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































GRANT ALL ON FUNCTION "public"."create_profile_on_signup"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_profile_on_signup"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_profile_on_signup"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_game_summary"("input_game_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_game_summary"("input_game_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_game_summary"("input_game_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_region_1depth_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_region_1depth_count"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_region_1depth_count"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_region_2depth_count"("region_1depth_name" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."get_region_2depth_count"("region_1depth_name" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_region_2depth_count"("region_1depth_name" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_region_2depth_counts"("region_1depth_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_region_2depth_counts"("region_1depth_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_region_2depth_counts"("region_1depth_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."insert_courses"("data" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."insert_courses"("data" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_courses"("data" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."nearby_golf_courses"("latitude" double precision, "longitude" double precision, "max_results" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."nearby_golf_courses"("latitude" double precision, "longitude" double precision, "max_results" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."nearby_golf_courses"("latitude" double precision, "longitude" double precision, "max_results" integer) TO "service_role";

















































































GRANT ALL ON TABLE "public"."courses" TO "anon";
GRANT ALL ON TABLE "public"."courses" TO "authenticated";
GRANT ALL ON TABLE "public"."courses" TO "service_role";



GRANT ALL ON TABLE "public"."game_courses" TO "anon";
GRANT ALL ON TABLE "public"."game_courses" TO "authenticated";
GRANT ALL ON TABLE "public"."game_courses" TO "service_role";



GRANT ALL ON TABLE "public"."game_player_scores" TO "anon";
GRANT ALL ON TABLE "public"."game_player_scores" TO "authenticated";
GRANT ALL ON TABLE "public"."game_player_scores" TO "service_role";



GRANT ALL ON TABLE "public"."game_players" TO "anon";
GRANT ALL ON TABLE "public"."game_players" TO "authenticated";
GRANT ALL ON TABLE "public"."game_players" TO "service_role";



GRANT ALL ON TABLE "public"."game_scores" TO "anon";
GRANT ALL ON TABLE "public"."game_scores" TO "authenticated";
GRANT ALL ON TABLE "public"."game_scores" TO "service_role";



GRANT ALL ON TABLE "public"."games" TO "anon";
GRANT ALL ON TABLE "public"."games" TO "authenticated";
GRANT ALL ON TABLE "public"."games" TO "service_role";



GRANT ALL ON TABLE "public"."golf_course_qnas" TO "anon";
GRANT ALL ON TABLE "public"."golf_course_qnas" TO "authenticated";
GRANT ALL ON TABLE "public"."golf_course_qnas" TO "service_role";



GRANT ALL ON TABLE "public"."golf_course_reviews" TO "anon";
GRANT ALL ON TABLE "public"."golf_course_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."golf_course_reviews" TO "service_role";



GRANT ALL ON TABLE "public"."golf_courses" TO "anon";
GRANT ALL ON TABLE "public"."golf_courses" TO "authenticated";
GRANT ALL ON TABLE "public"."golf_courses" TO "service_role";



GRANT ALL ON TABLE "public"."holes" TO "anon";
GRANT ALL ON TABLE "public"."holes" TO "authenticated";
GRANT ALL ON TABLE "public"."holes" TO "service_role";



GRANT ALL ON TABLE "public"."lot_number_addresses" TO "anon";
GRANT ALL ON TABLE "public"."lot_number_addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."lot_number_addresses" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."road_addresses" TO "anon";
GRANT ALL ON TABLE "public"."road_addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."road_addresses" TO "service_role";



GRANT ALL ON TABLE "public"."scraped_golf_courses" TO "anon";
GRANT ALL ON TABLE "public"."scraped_golf_courses" TO "authenticated";
GRANT ALL ON TABLE "public"."scraped_golf_courses" TO "service_role";



GRANT ALL ON SEQUENCE "public"."scraped_golf_courses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."scraped_golf_courses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."scraped_golf_courses_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."tournaments" TO "anon";
GRANT ALL ON TABLE "public"."tournaments" TO "authenticated";
GRANT ALL ON TABLE "public"."tournaments" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
