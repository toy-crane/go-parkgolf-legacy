import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BottomNav from "@/components/nav/bottom";
import { readUserSession } from "@/libs/auth";
import { isApp } from "@/libs/user-agent";

const DownloadBanner = dynamic(
  () => import("@/components/app/download-banner"),
  {
    ssr: false,
  },
);

const Layout = async (props: { children: React.ReactNode }) => {
  const session = await readUserSession();
  const pathname = headers().get("x-pathname") ?? "";
  if (!session)
    return redirect(
      `/login?${new URLSearchParams({ next: pathname }).toString()}`,
    );

  const headersList = headers();
  const userAgent = headersList.get("user-agent")!;
  const appVersion = headersList.get("App-Version") ?? undefined;

  return (
    <>
      <DownloadBanner isApp={isApp(userAgent)} />
      <main className="content-grid pb-[var(--bottom-nav-height)]">
        {props.children}
      </main>
      {!appVersion && <BottomNav />}
    </>
  );
};

export default Layout;
