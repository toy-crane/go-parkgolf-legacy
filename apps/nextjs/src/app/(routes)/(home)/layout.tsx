import { headers } from "next/headers";
import BottomNav from "@/components/nav/bottom";

const Layout = (props: { children: React.ReactNode }) => {
  const appVersion = headers().get("App-Version") ?? undefined;
  return (
    <div className="max-h-[100vh] overflow-hidden">
      <main>{props.children}</main>
      {!appVersion && <BottomNav />}
    </div>
  );
};

export default Layout;
