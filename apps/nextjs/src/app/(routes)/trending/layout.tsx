import BottomNav from "@/components/nav/bottom";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { TrendingUp } from "lucide-react";

import { TrendingNav } from "./nav";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <main className="content-grid pb-[var(--bottom-nav-height)]">
        <div className="pb-14">
          <PageHeader className="relative flex flex-row items-center pb-4 md:pb-6">
            <PageHeaderHeading className="underline decoration-[#22DC48] decoration-4 underline-offset-[10px]">
              파크골프 트렌드
            </PageHeaderHeading>
            <TrendingUp className="ml-1 h-10 w-10" />
          </PageHeader>
          <section className="space-y-4">
            <TrendingNav />
            {props.children}
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
};

export default Layout;
