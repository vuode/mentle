import { useMemo, useState } from "react";
import { NumeralCategory, getSentence } from "@mentle/language-utils/sentences";
import { NumeralsCard } from "./numerals-card";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@mentle/ui/button";
import { AnimatePresence } from "framer-motion";
import { SwipeCard, useSwipeCard } from "@mentle/ui/swipe-card";
import { AnswerButton } from "./answer-button";
import { AnswersCard } from "./answers-card";

interface NumeralsExerciseProps {
  token: string;
  tasks: NumeralCategory[];
  onFinish: () => void;
}

type Answers = [NumeralCategory, "right" | "wrong"][];

export const NumeralsExercise: React.FC<NumeralsExerciseProps> = ({
  token,
  tasks,
  onFinish,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);

  const nextCard = (direction: "right" | "left") => {
    setAnswers((previous) => {
      const currentCategory = tasks[currentIndex];

      if (!currentCategory) return previous;

      return [
        ...previous,
        [currentCategory, direction === "right" ? "right" : "wrong"],
      ];
    });
    setCurrentIndex((previous) => previous + 1);
  };

  const {
    currentCardConfig,
    nextCardConfig,
    direction,
    onExitComplete,
    setDirection,
  } = useSwipeCard({
    allowSwipe: showAnswer,
    threshold: 0.1,
    colors: { right: "#DCFCE7", left: "#FEE2E2", default: "#FFFFFF" },
    onCardSwipe: (direction) => {
      nextCard(direction);
      setShowAnswer(false);
    },
  });

  const finished = currentIndex >= tasks.length;

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
          {finished ? tasks.length : currentIndex + 1} / {tasks.length}
        </div>
      </div>

      <div className="h-[10%] font-semibold text-center">
        {finished
          ? "Wyniki"
          : "Użyj podanych słów, aby stworzyć zdanie w czasie przeszłym:"}
      </div>

      <div className="h-3/5 relative">
        <AnimatePresence custom={direction} onExitComplete={onExitComplete}>
          <SwipeCard
            className="p-4 h-full w-full border border-gray-200 shadow rounded-xl"
            config={nextCardConfig}
            pending={!finished}
          >
            <AnswersCard answers={answers} hide={!finished} />
          </SwipeCard>
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
      {finished && <div className="h-[10%]" />}
      {!finished && (
        <div className="h-[10%] flex justify-around items-center">
          {showAnswer ? (
            <>
              <AnswerButton
                type="left"
                onClick={() => {
                  setDirection("left");
                  nextCard("left");
                  setShowAnswer(false);
                }}
                direction={direction}
              />
              <AnswerButton
                type="right"
                onClick={() => {
                  setDirection("right");
                  nextCard("right");
                  setShowAnswer(false);
                }}
                direction={direction}
              />
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
      )}
    </div>
  );
};
