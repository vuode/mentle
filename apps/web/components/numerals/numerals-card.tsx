import { generateRandomSentence } from "@repo/language-utils/sentences";
import { QuizCardContent } from "@repo/ui/quiz-card-content";
import { SwipeCard } from "@repo/ui/swipe-card";

type Exercise = Exclude<ReturnType<typeof generateRandomSentence>, null>;

interface NumeralsCardProps {
  className?: string;
  exercise: Exercise;
  showAnswer?: boolean;
  onAnswer: (correct: boolean) => void;
  onShowAnswer: () => void;
  exit?: boolean;
  onCardExit: () => void;
}

interface QATemplateProps {
  sentence: Exercise["base"] | Exercise["sentence"];
}

const join = (values: Array<string | undefined>, separator: string) =>
  values.flatMap((value) => value ?? []).join(separator);

const QATemplate: React.FC<QATemplateProps> = ({ sentence }) => (
  <div className="text-center">
    <div className="text-xl font-semibold">{sentence.num}</div>
    <div className="text-xl">{sentence.subject}</div>
    <div>{join([sentence.before, sentence.verb, sentence.after], " ")}</div>
  </div>
);

export const NumeralsCard: React.FC<NumeralsCardProps> = ({
  className,
  exercise,
  showAnswer,
  onAnswer,
  onShowAnswer,
  onCardExit,
  exit,
}) => {
  const { sentence, base } = exercise;

  return (
    <SwipeCard
      className={className}
      allowSwipe={showAnswer}
      onClick={onShowAnswer}
      onSwipeEnd={() => onAnswer(true)}
      exit={exit}
      onExitEnd={onCardExit}
    >
      <QuizCardContent
        question={<QATemplate sentence={base} />}
        answer={<QATemplate sentence={sentence} />}
        showAnswer={showAnswer}
      />
    </SwipeCard>
  );
};
