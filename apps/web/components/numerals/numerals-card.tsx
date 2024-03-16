import { generateRandomSentence } from "@repo/language-utils/sentences";
import { QuizCard } from "@repo/ui/quiz-card";

type Exercise = Exclude<ReturnType<typeof generateRandomSentence>, null>;

interface NumeralsCardProps {
  className?: string;
  exercise: Exercise;
  index: number;
  showAnswer: boolean;
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
  index,
}) => {
  const { sentence, base } = exercise;

  return (
    <QuizCard
      className={className}
      cardKey={JSON.stringify({ base, index })}
      question={<QATemplate sentence={base} />}
      answer={<QATemplate sentence={sentence} />}
      showAnswer={showAnswer}
    />
  );
};
