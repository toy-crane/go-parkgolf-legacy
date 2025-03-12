export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      courses: {
        Row: {
          created_at: string
          description: string | null
          golf_course_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          golf_course_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          golf_course_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: false
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      game_courses: {
        Row: {
          created_at: string
          game_id: string
          hole_count: number
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          game_id: string
          hole_count: number
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          game_id?: string
          hole_count?: number
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_courses_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_player_scores: {
        Row: {
          created_at: string
          game_player_id: string
          game_score_id: string
          id: string
          score: number
        }
        Insert: {
          created_at?: string
          game_player_id: string
          game_score_id: string
          id?: string
          score: number
        }
        Update: {
          created_at?: string
          game_player_id?: string
          game_score_id?: string
          id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_player_scores_game_player_id_fkey"
            columns: ["game_player_id"]
            isOneToOne: false
            referencedRelation: "game_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_player_scores_game_score_id_fkey"
            columns: ["game_score_id"]
            isOneToOne: false
            referencedRelation: "game_scores"
            referencedColumns: ["id"]
          },
        ]
      }
      game_players: {
        Row: {
          created_at: string
          game_id: string
          id: string
          nickname: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          nickname: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          nickname?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_scores: {
        Row: {
          created_at: string
          game_course_id: string
          hole_number: number
          id: string
          par: number
        }
        Insert: {
          created_at?: string
          game_course_id: string
          hole_number: number
          id?: string
          par: number
        }
        Update: {
          created_at?: string
          game_course_id?: string
          hole_number?: number
          id?: string
          par?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_scores_game_course_id_fkey"
            columns: ["game_course_id"]
            isOneToOne: false
            referencedRelation: "game_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          finished_at: string | null
          golf_course_id: string
          id: string
          started_at: string
          status: Database["public"]["Enums"]["game_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          finished_at?: string | null
          golf_course_id: string
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["game_status"]
          user_id?: string
        }
        Update: {
          created_at?: string
          finished_at?: string | null
          golf_course_id?: string
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["game_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: false
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      golf_course_qnas: {
        Row: {
          content: string
          created_at: string
          golf_course_id: string
          id: string
          level: number
          parent_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          golf_course_id: string
          id?: string
          level?: number
          parent_id?: string | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          golf_course_id?: string
          id?: string
          level?: number
          parent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "golf_course_qnas_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: false
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "golf_course_qnas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      golf_course_reviews: {
        Row: {
          course_condition_rating: number
          course_difficulty_rating: number
          created_at: string
          facilities_rating: number
          golf_course_id: string
          id: string
          text: string
          user_id: string
        }
        Insert: {
          course_condition_rating: number
          course_difficulty_rating: number
          created_at?: string
          facilities_rating: number
          golf_course_id: string
          id?: string
          text: string
          user_id?: string
        }
        Update: {
          course_condition_rating?: number
          course_difficulty_rating?: number
          created_at?: string
          facilities_rating?: number
          golf_course_id?: string
          id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "golf_course_reviews_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: false
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "golf_course_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      golf_courses: {
        Row: {
          created_at: string
          hole_count: number
          id: string
          lat: number
          lng: number
          location: unknown | null
          lot_number_address_name: string
          name: string
          opening_hours: string | null
          phone_number: string | null
          publish_status: Database["public"]["Enums"]["publish_status"]
          registration_method: string | null
          regular_closed_days: string | null
          road_address_name: string | null
          slug: string
          website: string | null
        }
        Insert: {
          created_at?: string
          hole_count: number
          id?: string
          lat: number
          lng: number
          location?: unknown | null
          lot_number_address_name: string
          name?: string
          opening_hours?: string | null
          phone_number?: string | null
          publish_status?: Database["public"]["Enums"]["publish_status"]
          registration_method?: string | null
          regular_closed_days?: string | null
          road_address_name?: string | null
          slug: string
          website?: string | null
        }
        Update: {
          created_at?: string
          hole_count?: number
          id?: string
          lat?: number
          lng?: number
          location?: unknown | null
          lot_number_address_name?: string
          name?: string
          opening_hours?: string | null
          phone_number?: string | null
          publish_status?: Database["public"]["Enums"]["publish_status"]
          registration_method?: string | null
          regular_closed_days?: string | null
          road_address_name?: string | null
          slug?: string
          website?: string | null
        }
        Relationships: []
      }
      holes: {
        Row: {
          course_id: string
          created_at: string
          distance: number | null
          hole_number: number
          id: string
          par: number
        }
        Insert: {
          course_id: string
          created_at?: string
          distance?: number | null
          hole_number: number
          id?: string
          par: number
        }
        Update: {
          course_id?: string
          created_at?: string
          distance?: number | null
          hole_number?: number
          id?: string
          par?: number
        }
        Relationships: [
          {
            foreignKeyName: "holes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lot_number_addresses: {
        Row: {
          address_name: string | null
          b_code: string | null
          golf_course_id: string
          h_code: string | null
          main_address_no: string | null
          mountain_yn: string | null
          region_1depth_name: string
          region_2depth_name: string | null
          region_3depth_h_name: string | null
          region_3depth_name: string | null
          sub_address_no: string | null
          x: number | null
          y: number | null
        }
        Insert: {
          address_name?: string | null
          b_code?: string | null
          golf_course_id: string
          h_code?: string | null
          main_address_no?: string | null
          mountain_yn?: string | null
          region_1depth_name: string
          region_2depth_name?: string | null
          region_3depth_h_name?: string | null
          region_3depth_name?: string | null
          sub_address_no?: string | null
          x?: number | null
          y?: number | null
        }
        Update: {
          address_name?: string | null
          b_code?: string | null
          golf_course_id?: string
          h_code?: string | null
          main_address_no?: string | null
          mountain_yn?: string | null
          region_1depth_name?: string
          region_2depth_name?: string | null
          region_3depth_h_name?: string | null
          region_3depth_name?: string | null
          sub_address_no?: string | null
          x?: number | null
          y?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lot_number_addresses_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: true
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          created_at: string
          id: string
          name: string
          username: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          id: string
          name: string
          username: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          id?: string
          name?: string
          username?: string
        }
        Relationships: []
      }
      road_addresses: {
        Row: {
          address_name: string | null
          building_name: string | null
          golf_course_id: string
          main_building_no: string | null
          region_1depth_name: string | null
          region_2depth_name: string | null
          region_3depth_name: string | null
          road_name: string | null
          sub_building_no: string | null
          underground_yn: string | null
          x: number | null
          y: number | null
          zone_no: string | null
        }
        Insert: {
          address_name?: string | null
          building_name?: string | null
          golf_course_id: string
          main_building_no?: string | null
          region_1depth_name?: string | null
          region_2depth_name?: string | null
          region_3depth_name?: string | null
          road_name?: string | null
          sub_building_no?: string | null
          underground_yn?: string | null
          x?: number | null
          y?: number | null
          zone_no?: string | null
        }
        Update: {
          address_name?: string | null
          building_name?: string | null
          golf_course_id?: string
          main_building_no?: string | null
          region_1depth_name?: string | null
          region_2depth_name?: string | null
          region_3depth_name?: string | null
          road_name?: string | null
          sub_building_no?: string | null
          underground_yn?: string | null
          x?: number | null
          y?: number | null
          zone_no?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "road_addresses_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: true
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      scraped_golf_courses: {
        Row: {
          address: string
          created_at: string
          hole_count: number
          id: number
          name: string
          status: Database["public"]["Enums"]["scraped_status"] | null
        }
        Insert: {
          address: string
          created_at?: string
          hole_count: number
          id?: number
          name: string
          status?: Database["public"]["Enums"]["scraped_status"] | null
        }
        Update: {
          address?: string
          created_at?: string
          hole_count?: number
          id?: number
          name?: string
          status?: Database["public"]["Enums"]["scraped_status"] | null
        }
        Relationships: []
      }
      tournaments: {
        Row: {
          created_at: string
          eligibility_criteria: string | null
          end_date: string
          golf_course_id: string
          host: string
          id: string
          name: string
          number_of_participants: number
          organizer: string
          recruitment_detail_url: string
          registration_end_date: string | null
          registration_fee: string | null
          registration_start_date: string | null
          sponsor: string
          start_date: string
        }
        Insert: {
          created_at?: string
          eligibility_criteria?: string | null
          end_date: string
          golf_course_id: string
          host: string
          id?: string
          name: string
          number_of_participants: number
          organizer: string
          recruitment_detail_url: string
          registration_end_date?: string | null
          registration_fee?: string | null
          registration_start_date?: string | null
          sponsor: string
          start_date: string
        }
        Update: {
          created_at?: string
          eligibility_criteria?: string | null
          end_date?: string
          golf_course_id?: string
          host?: string
          id?: string
          name?: string
          number_of_participants?: number
          organizer?: string
          recruitment_detail_url?: string
          registration_end_date?: string | null
          registration_fee?: string | null
          registration_start_date?: string | null
          sponsor?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_tournaments_golf_course_id_fkey"
            columns: ["golf_course_id"]
            isOneToOne: false
            referencedRelation: "golf_courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_game_summary: {
        Args: {
          input_game_id: string
        }
        Returns: {
          game_player_id: string
          player_name: string
          game_course: string
          total_score: number
        }[]
      }
      get_region_1depth_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          region_1depth_name: string
          count: number
        }[]
      }
      get_region_2depth_count: {
        Args: {
          region_1depth_name: string
        }
        Returns: {
          region_2depth_name: string
          count: number
        }[]
      }
      get_region_2depth_counts: {
        Args: {
          region_1depth_name: string
        }
        Returns: {
          region_2depth_name: string
          count: number
        }[]
      }
      insert_courses: {
        Args: {
          data: Json
        }
        Returns: undefined
      }
      nearby_golf_courses: {
        Args: {
          latitude: number
          longitude: number
          max_results: number
        }
        Returns: {
          id: string
          created_at: string
          name: string
          hole_count: number
          slug: string
          lot_number_address_name: string
          road_address_name: string
          lng: number
          lat: number
          publish_status: Database["public"]["Enums"]["publish_status"]
          location: unknown
          dist_meters: number
        }[]
      }
    }
    Enums: {
      game_status: "draft" | "in_progress" | "completed" | "deleted"
      publish_status: "draft" | "completed"
      scraped_status: "draft" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prefixes_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: {
          _bucket_id: string
          _name: string
        }
        Returns: undefined
      }
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      delete_prefix: {
        Args: {
          _bucket_id: string
          _name: string
        }
        Returns: boolean
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_level: {
        Args: {
          name: string
        }
        Returns: number
      }
      get_prefix: {
        Args: {
          name: string
        }
        Returns: string
      }
      get_prefixes: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_legacy_v1: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v1_optimised: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v2: {
        Args: {
          prefix: string
          bucket_name: string
          limits?: number
          levels?: number
          start_after?: string
        }
        Returns: {
          key: string
          name: string
          id: string
          updated_at: string
          created_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

