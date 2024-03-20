import { readUserSession } from "@/libs/auth";
import { createSupabaseServerClient } from "@/libs/supabase/server";
import { cn } from "@/libs/tailwind";

import BackButton from "./back-button";

const Header = async ({ gameId }: { gameId: string }) => {
  const supabase = await createSupabaseServerClient();
  const response = await supabase
    .from("games")
    .select("golf_courses(name),user_id")
    .eq("id", gameId)
    .single();
  if (response.error) throw response.error;
  const courseName = response.data.golf_courses?.name;
  return (
    <>
      <div className="flex items-center gap-1 pt-2">
        <BackButton />
        <div className="flex-auto">
          <h3
            className={cn(
              "flex break-keep text-lg font-semibold leading-5 tracking-tight",
            )}
          >
            {courseName ? courseName : null}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Header;
