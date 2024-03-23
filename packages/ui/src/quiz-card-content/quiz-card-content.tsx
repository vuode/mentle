import { motion } from "framer-motion";
import { cn } from "../utils";

export interface QuizCardContentProps {
  className?: string;
  question: React.ReactNode;
  answer: React.ReactNode;
  showAnswer?: boolean;
}

export const QuizCardContent: React.FC<QuizCardContentProps> = ({
  className,
  question,
  answer,
  showAnswer,
}) => {
  return (
    <motion.div
      className={cn(
        "ui-flex ui-flex-col ui-justify-between ui-h-full",
        className,
      )}
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
  );
};
