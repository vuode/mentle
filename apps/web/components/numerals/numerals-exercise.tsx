import { useEffect, useMemo, useState } from "react";
import { Config } from "../../data/numeral-categories";
import { generateRandomSentence } from "@repo/language-utils/sentences";
import { NumeralsCard } from "./numerals-card";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { ProgressBar } from "../progress-bar";
import { IconButton } from "@repo/ui/button";

interface NumeralsExerciseProps {
  config: Config[];
  onFinish: () => void;
}

export const NumeralsExercise: React.FC<NumeralsExerciseProps> = ({
  config,
  onFinish,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const finished = currentIndex >= config.length;
  useEffect(() => {
    if (finished) {
      onFinish();
    }
  }, [finished]);

  const exercises = useMemo(
    () =>
      config.map(({ num, gender, type }) => ({
        exercise: generateRandomSentence(num, gender),
        type,
      })),
    [config],
  );

  const current = exercises[currentIndex];

  if (!current) {
    return null;
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-[10%] flex flex-col justify-between">
        <button
          className="flex items-center text-blue-600"
          onClick={() => onFinish()}
        >
          <ArrowLeft />
        </button>
        <div className="flex items-center">
          <ProgressBar element={currentIndex} total={config.length} />
          <div className="ml-2">
            {currentIndex + 1}/{config.length}
          </div>
        </div>
      </div>
      <div className="h-2/3">
        <NumeralsCard exercise={current.exercise} showAnswer={showAnswer} />
      </div>
      <div className="h-[10%] flex justify-around items-center">
        {showAnswer ? (
          <IconButton
            onClick={() => {
              setCurrentIndex((previous) => previous + 1);
              setShowAnswer(false);
            }}
          >
            <ArrowRight />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setShowAnswer(true);
            }}
            color="blue"
            size="large"
          >
            <Eye />
          </IconButton>
        )}
      </div>
    </div>
  );
};
