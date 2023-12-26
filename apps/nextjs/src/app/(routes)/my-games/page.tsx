import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { PageHeader, PageHeaderHeading } from "../../../components/page-header";
import { getMyGames } from "./fetcher";
import GameCard from "./game-card";

const Page = async () => {
  const games = await getMyGames();
  const hasGames = games && games?.length > 0;
  console.log(games);

  return (
    <section>
      <PageHeader className="relative flex flex-row items-center justify-between pb-4 md:pb-8">
        <PageHeaderHeading>나의 스코어 카드</PageHeaderHeading>
        <Button size="sm" asChild>
          {hasGames && (
            <Link href="score-card/create/golf-course">
              <Plus className="h-5 w-5" size={24} />
              게임 추가하기
            </Link>
          )}
        </Button>
      </PageHeader>
      <div className="grid grid-cols-1 gap-3">
        {hasGames ? (
          <>{games?.map((game) => <GameCard game={game} key={game.id} />)}</>
        ) : (
          <div className="flex h-[65vh] flex-col items-center justify-center gap-6">
            <span className="max-w-[300px] text-center text-2xl font-bold">
              쉽고 빠르게 <br />
              스코어를 등록하고 <br />
              주변에 공유해 보세요
            </span>
            <Button size="lg" asChild>
              <Link href="score-card/create/golf-course">
                <Plus className="mr-2 h-5 w-5" size={24} />
                신규 게임 추가하기
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
