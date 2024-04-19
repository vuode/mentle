import { useEffect, useMemo, useState } from "react";
import { NumeralCategory, getSentence } from "@repo/language-utils/sentences";
import { NumeralsCard } from "./numerals-card";
import { ArrowLeft, X, Eye, Check } from "lucide-react";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";
import { AnimatePresence } from "framer-motion";
import { SwipeCard, useSwipeCard } from "@repo/ui/swipe-card";

interface NumeralsExerciseProps {
  token: string;
  tasks: NumeralCategory[];
  onFinish: () => void;
}

export const NumeralsExercise: React.FC<NumeralsExerciseProps> = ({
  token,
  tasks,
  onFinish,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    currentCardConfig,
    nextCardConfig,
    direction,
    onExitComplete,
    setDirection,
  } = useSwipeCard({
    allowSwipe: showAnswer,
    threshold: 0.2,
    colors: { right: "#DCFCE7", left: "#FEE2E2", default: "#FFFFFF" },
    onCardSwipe: () => {
      setCurrentIndex((previous) => previous + 1);
      setShowAnswer(false);
    },
  });

  const finished = currentIndex >= tasks.length;
  useEffect(() => {
    if (finished) {
      onFinish();
    }
  }, [finished]);

  const exercises = useMemo(
    () =>
      tasks
        .map((category, index) => ({
          exercise: getSentence(token, index, category),
          type: category,
          index,
        }))
        .slice()
        .reverse(),
    [tasks],
  );

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <Button size="icon" variant="ghost" onClick={() => onFinish()}>
          <ArrowLeft />
        </Button>
        <div>
          {currentIndex + 1} / {tasks.length}
        </div>
      </div>

      <div className="font-semibold text-center">
        Użyj podanych słów, aby stworzyć zdanie w czasie przeszłym:
      </div>

      <div className="h-3/5 relative">
        <AnimatePresence custom={direction} onExitComplete={onExitComplete}>
          {exercises.map(({ exercise, index }) => {
            const isCurrentCard = index === currentIndex;
            const isPendingCard = index === currentIndex + 1;

            if (!isCurrentCard && !isPendingCard) return;

            return (
              <SwipeCard
                className="p-4 h-full w-full border border-gray-200 shadow rounded-xl"
                key={index}
                config={isCurrentCard ? currentCardConfig : nextCardConfig}
                onClick={
                  showAnswer
                    ? undefined
                    : () => {
                        setShowAnswer(true);
                      }
                }
                pending={isPendingCard}
              >
                <NumeralsCard
                  exercise={exercise}
                  showAnswer={isCurrentCard ? showAnswer : false}
                />
              </SwipeCard>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex justify-around items-center">
        {showAnswer ? (
          <>
            <Button
              key="left"
              onClick={() => {
                setDirection("left");
                setCurrentIndex((previous) => previous + 1);
                setShowAnswer(false);
              }}
              className={cn("rounded-full", {
                "bg-red-200": direction === "left",
              })}
              size="icon-xl"
              variant="secondary"
            >
              <X />
            </Button>
            <Button
              key="right"
              onClick={() => {
                setDirection("right");
                setCurrentIndex((previous) => previous + 1);
                setShowAnswer(false);
              }}
              className={cn("rounded-full", {
                "bg-green-200": direction === "right",
              })}
              size="icon-xl"
              variant="secondary"
            >
              <Check />
            </Button>
          </>
        ) : (
          <Button
            key="show"
            onClick={() => {
              setShowAnswer(true);
            }}
            className="rounded-full"
            size="icon-xl"
            variant="secondary"
          >
            <Eye />
          </Button>
        )}
      </div>
    </div>
  );
};
