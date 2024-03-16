import { useEffect, useMemo, useState } from "react";
import { NumeralCategory, getSentence } from "@repo/language-utils/sentences";
import { NumeralsCard } from "./numerals-card";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { ProgressBar } from "@repo/ui/progress-bar";
import { Button } from "@repo/ui/button";

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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const finished = currentIndex >= tasks.length;
  useEffect(() => {
    if (finished) {
      onFinish();
    }
  }, [finished]);

  const exercises = useMemo(
    () =>
      tasks.map((category, index) => ({
        exercise: getSentence(token, index, category),
        type: category,
      })),
    [tasks],
  );

  const current = exercises[currentIndex];

  if (!current) {
    return null;
  }

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

      <NumeralsCard
        className="h-2/3"
        exercise={current.exercise}
        showAnswer={showAnswer}
      />
      <div className="flex justify-around items-center">
        {showAnswer ? (
          <Button
            onClick={() => {
              setCurrentIndex((previous) => previous + 1);
              setShowAnswer(false);
            }}
            className="rounded-full"
            size="icon-lg"
            variant="blue"
          >
            <ArrowRight />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowAnswer(true);
            }}
            className="rounded-full"
            size="icon-lg"
            variant="blue"
          >
            <Eye />
          </Button>
        )}
      </div>
    </div>
  );
};
