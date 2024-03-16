import { cn } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

interface QuizCardProps {
  className?: string;
  cardKey: React.Key;
  question: React.ReactNode;
  answer: React.ReactNode;
  showAnswer?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  className,
  cardKey,
  question,
  answer,
  showAnswer,
}) => {
  return (
    <article
      className={cn(
        "ui-p-4 ui-h-full ui-bg-white ui-border ui-border-gray-200 ui-shadow ui-rounded-xl ui-overflow-hidden",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={cardKey}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.17 }}
          className="ui-flex ui-flex-col ui-justify-between ui-h-full"
        >
          <section className="ui-grow ui-flex ui-flex-col ui-justify-center ui-h-[10%]">
            {question}
          </section>
          {showAnswer && (
            <>
              <motion.div
                key="line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ui-border-b ui-border-gray-200"
              />
              <motion.section
                key="answer"
                initial={{ opacity: 0, flexGrow: 0, height: "0%" }}
                animate={{
                  opacity: 1,
                  flexGrow: 1,
                  height: "10%",
                }}
                transition={{ duration: 0.2 }}
                className="ui-flex ui-flex-col ui-justify-center"
              >
                {answer}
              </motion.section>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </article>
  );
};
