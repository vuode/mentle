import { NumeralCategory } from "@repo/language-utils/sentences";
import { cn } from "@repo/ui/utils";

export type Answer = [NumeralCategory, "right" | "wrong"];

interface AnswersCardProps {
  answers: Answer[];
  hide?: boolean;
}

type Stats = Record<
  NumeralCategory,
  { title: string; total: number; right: number }
>;

interface ProgressProps {
  procent: number;
}

const Progress: React.FC<ProgressProps> = ({ procent }) => {
  return (
    <div className="bg-slate-200 h-4 flex items-center rounded-lg overflow-hidden">
      <div
        className="bg-green-400 h-full"
        style={{
          width: `${procent}%`,
        }}
      />
    </div>
  );
};

export const AnswersCard: React.FC<AnswersCardProps> = ({ answers, hide }) => {
  const stats: Stats = {
    ends_1: {
      title: "Liczebniki, kończące się na 1",
      total: answers.filter(([category]) => category === "ends_1").length,
      right: answers.filter(
        ([category, answer]) => category === "ends_1" && answer === "right",
      ).length,
    },
    ends_2_4: {
      title: "Liczebniki, kończące się na 2, 3, 4, oprócz liczb 12, 13, 14",
      total: answers.filter(([category]) => category === "ends_2_4").length,
      right: answers.filter(
        ([category, answer]) => category === "ends_2_4" && answer === "right",
      ).length,
    },
    mp: {
      title: "Dowolne liczebniki w połączeniu z rzeczownikiem męskoosobowym",
      total: answers.filter(([category]) => category === "mp").length,
      right: answers.filter(
        ([category, answer]) => category === "mp" && answer === "right",
      ).length,
    },
    rest: {
      title: "Liczebniki, kończące się na 5, 6, 7, 8, 9, 0",
      total: answers.filter(([category]) => category === "rest").length,
      right: answers.filter(
        ([category, answer]) => category === "rest" && answer === "right",
      ).length,
    },
  };

  return (
    <div className={cn({ "blur-lg": hide })}>
      {Object.entries(stats).map(([key, { title, total, right }]) =>
        total ? (
          <div key={key} className="my-2">
            <div className="mb-2 flex justify-between items-start">
              <div>{title}</div>
              <div className="min-w-14 font-semibold text-right">
                {right} / {total}
              </div>
            </div>
            <Progress procent={(right / total) * 100} />
          </div>
        ) : null,
      )}
    </div>
  );
};
