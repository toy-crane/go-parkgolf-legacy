"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateStorage } from "@toss/storage";
import { useLockBodyScroll } from "@uidotdev/usehooks";

import type { Cell, GameCourse, Score } from "../type";
import { ScoreTable } from "./score-table";

const safeLocalStorage = generateStorage();

const MergeScores = (scores: Score[], localScores: Score[]) => {
  const newScores = scores.map((s) => {
    const localScore = localScores.find((ls) => ls.id === s.id);
    return localScore ?? s;
  });
  return newScores;
};

export const ScoreCard = ({
  gameCourses,
  selectedTab,
  isMyGame,
  data,
  gameId,
  gamePlayers,
}: {
  gameId: string;
  data: Score[];
  gameCourses: GameCourse[];
  selectedTab?: string;
  isMyGame: boolean;
  gamePlayers: { id: string; nickname: string }[];
}) => {
  useLockBodyScroll();
  const [handlerOpen, setHandlerOpen] = useState(true);
  const initialScores = MergeScores(
    data,
    JSON.parse(
      safeLocalStorage.get(`${gameId}-changed-scores`) ?? "[]",
    ) as Score[],
  );
  const [scores, setScores] = useState<Score[]>(initialScores);
  const defaultSelectedCell = isMyGame
    ? { row: "0", colName: gamePlayers[0]?.id! }
    : undefined;
  const [selectedCell, setSelectedCell] = useState<Cell | undefined>(
    defaultSelectedCell,
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (selectedCell) {
      setHandlerOpen(true);
    }
  }, [selectedCell]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", String(value));
    const courseId = gameCourses.find((gc) => gc.name === value)?.id;
    const rowNum = scores.findIndex((s) => s.gameCourseId === courseId);
    if (rowNum !== undefined) {
      setSelectedCell({
        row: String(rowNum),
        colName: gamePlayers[0]?.id!,
      });
    }
    router.replace(`?${params.toString()}`);
  };

  const handleClick = (row: string, colName: string, score: number) => {
    const currentScores = scores.find((_, index) => index === Number(row));
    if (!currentScores) return;
    const updatedScores = {
      ...currentScores,
      [colName]: score,
    };
    setScores((origin) =>
      origin.map((s) => (s.id === updatedScores.id ? updatedScores : s)),
    );
    const localScores = JSON.parse(
      safeLocalStorage.get(`${gameId}-changed-scores`) ?? "[]",
    ) as Score[];
    const newLocalScores = [
      ...localScores.filter((s) => s.id !== updatedScores.id),
      updatedScores,
    ];
    safeLocalStorage.set(
      `${gameId}-changed-scores`,
      JSON.stringify(newLocalScores),
    );
  };

  const handleSelectedCell = (cell: Cell) => {
    setSelectedCell(cell);
  };

  return (
    <>
      <Tabs
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={handleTabChange}
        className="flex flex-col"
      >
        <TabsList className="h-7">
          {gameCourses.map((gc) => (
            <TabsTrigger
              value={gc.name}
              key={gc.id}
              className="flex-1 py-0.5 text-xs"
            >
              {gc.name} 코스
            </TabsTrigger>
          ))}
        </TabsList>
        {gameCourses.map((gc) => (
          <TabsContent value={gc.name} key={gc.id} className="flex-1">
            <ScoreTable
              onSelectedCell={handleSelectedCell}
              selectedCell={selectedCell}
              scores={scores}
              gameCourseId={gc.id}
              gamePlayers={gamePlayers}
            />
          </TabsContent>
        ))}
      </Tabs>
      <Drawer open={handlerOpen} onOpenChange={setHandlerOpen}>
        <DrawerContent>
          <div className="content-grid my-4">
            <div className="mb-3 text-center text-lg font-semibold">
              {selectedCell?.colName === "par" ? "홀의 정규 타수" : "타수"}를
              입력해 주세요
            </div>
            {selectedCell?.colName === "par" ? (
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[3, 4, 5].map((score, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      if (selectedCell) {
                        handleClick(
                          selectedCell.row,
                          selectedCell.colName,
                          score,
                        );
                      }
                      setHandlerOpen(false);
                    }}
                  >
                    {score} 타
                  </Button>
                ))}
              </div>
            ) : (
              <div className="mb-2 grid grid-cols-3 gap-2">
                {[...Array(9).keys()].map((score, index) => (
                  <Button
                    key={index}
                    variant={"secondary"}
                    onClick={() => {
                      if (selectedCell) {
                        handleClick(
                          selectedCell.row,
                          selectedCell.colName,
                          score + 1,
                        );
                      }
                      setHandlerOpen(false);
                    }}
                  >
                    {score + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
