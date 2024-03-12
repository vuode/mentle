import { cn } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

interface QuizCardProps {
  className?: string;
  key: React.Key;
  question: React.ReactNode;
  answer: React.ReactNode;
  showAnswer?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  className,
  key,
  question,
  answer,
  showAnswer,
}) => {
  return (
    <article
      className={cn(
        "p-4 h-full bg-white border border-gray-200 shadow rounded-xl overflow-hidden",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="flex flex-col justify-between h-full"
        >
          <section className="grow flex flex-col justify-center h-[10%]">
            {question}
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
                  {answer}
                </motion.section>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </article>
  );
};
