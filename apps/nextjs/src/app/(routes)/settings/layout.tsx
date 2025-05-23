import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BottomNav from "@/components/nav/bottom";
import { readUserSession } from "@/libs/auth";

const Layout = async (props: { children: React.ReactNode }) => {
  const session = await readUserSession();
  const pathname = headers().get("x-pathname") ?? "";
  if (!session)
    return redirect(
      `/login?${new URLSearchParams({ next: pathname }).toString()}`,
    );
  const appVersion = headers().get("App-Version") ?? undefined;

  return (
    <>
      <main className="content-grid pb-[var(--bottom-nav-height)]">
        {props.children}
      </main>
      {!appVersion && <BottomNav />}
    </>
  );
};

export default Layout;
