import { redirect } from "next/navigation";
import BottomNav from "@/components/nav/bottom";
import { useUserStore } from "@/libs/store/user";

const Layout = (props: { children: React.ReactNode }) => {
  const user = useUserStore.getState().user;

  if (!user) return redirect("/login");

  return (
    <>
      <main className="content-grid pb-[var(--bottom-nav-height)]">
        {props.children}
      </main>
      ;
      <BottomNav />
    </>
  );
};

export default Layout;
