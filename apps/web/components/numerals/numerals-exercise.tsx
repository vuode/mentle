import { useEffect, useMemo, useState } from "react";
import { NumeralCategory, getSentence } from "@repo/language-utils/sentences";
import { NumeralsCard } from "./numerals-card";
import { ArrowLeft, X, Eye, Check } from "lucide-react";
import { ProgressBar } from "@repo/ui/progress-bar";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";

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
  const [exitIndex, setExitIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"right" | "left" | null>(null);

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

  const getShowAnswer = (index: number) => {
    if (index === currentIndex) return showAnswer;
    if (index === exitIndex) return true;
    return false;
  };

  const getOnAnswer = (exitDirection?: "right" | "left") => () => {
    if (exitDirection) {
      setDirection(exitDirection);
    }

    setExitIndex(currentIndex);
    setShowAnswer(false);
    setCurrentIndex((previous) => previous + 1);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <Button size="icon" variant="ghost" onClick={() => onFinish()}>
            <ArrowLeft />
          </Button>
          <div>
            {currentIndex + 1} / {tasks.length}
          </div>
        </div>

        <ProgressBar currentIndex={currentIndex} length={tasks.length} />
      </div>

      <div className="font-semibold text-center">
        Użyj podanych słów, aby stworzyć zdanie w czasie przeszłym:
      </div>

      <div className="h-2/3 relative">
        {exercises.map(
          ({ exercise, index }) =>
            [currentIndex, exitIndex, currentIndex + 1].includes(index) && (
              <NumeralsCard
                key={index}
                className="absolute w-full"
                exercise={exercise}
                showAnswer={getShowAnswer(index)}
                onShowAnswer={() => {
                  setShowAnswer(true);
                }}
                onAnswer={getOnAnswer()}
                forceDirection={direction}
                exit={index === exitIndex}
                onCardExit={() => {
                  setExitIndex(null);
                  setDirection(null);
                }}
                onDirectionChange={setDirection}
              />
            ),
        )}
      </div>
      <div className="flex justify-around items-center">
        {showAnswer ? (
          <>
            <Button
              onClick={getOnAnswer("left")}
              className={cn("rounded-full", {
                "bg-red-200": direction === "left",
              })}
              size="icon-xl"
              variant="secondary"
            >
              <X />
            </Button>
            <Button
              onClick={getOnAnswer("right")}
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
