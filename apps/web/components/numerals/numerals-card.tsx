import { AnimatePresence, motion } from "framer-motion";
import { generateRandomSentence } from "@repo/language-utils/sentences";

type Exercise = Exclude<ReturnType<typeof generateRandomSentence>, null>;

interface NumeralsCardProps {
  exercise: Exercise;
  showAnswer: boolean;
}

const join = (values: Array<string | undefined>, separator: string) =>
  values.flatMap((value) => value ?? []).join(separator);

export const NumeralsCard: React.FC<NumeralsCardProps> = ({
  exercise,
  showAnswer,
}) => {
  const { sentence, base } = exercise;

  return (
    <article className="p-4 h-full bg-white border border-gray-200 shadow rounded-xl text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(base)}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="flex flex-col justify-between h-full"
        >
          <section className="grow flex flex-col justify-center h-[10%]">
            <div className="text-xl font-semibold">{base.num}</div>
            <div className="text-xl">{base.subject}</div>
            <div>{join([base.before, base.verb, base.after], " ")}</div>
          </section>
          <AnimatePresence>
            {showAnswer && (
              <>
                <motion.div
                  key="line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // exit={{ opacity: 0 }}
                  className="border-b border-gray-200"
                />
                <motion.section
                  key="answer"
                  initial={{ opacity: 0, flexGrow: 0, height: "0%" }}
                  animate={{
                    opacity: 1,
                    flexGrow: 1,
                    height: "10%",
                  }}
                  // exit={{ opacity: 0, flexGrow: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-center"
                >
                  <div className="text-xl font-semibold">{sentence.num}</div>
                  <div className="text-xl">{sentence.subject}</div>
                  <div>
                    {join(
                      [sentence.before, sentence.verb, sentence.after],
                      " ",
                    )}
                  </div>
                </motion.section>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </article>
  );
};
