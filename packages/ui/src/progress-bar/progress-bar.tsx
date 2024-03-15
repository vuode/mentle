import { cn } from "../utils";

interface ProgressBarProps {
  currentIndex: number;
  length: number;
}

const getEmptyArray = (length: number) => Array.from({ length }).fill(null);

const styles = {
  done: "ui-bg-blue-500",
  current: "ui-bg-blue-500 ui-animate-pulse",
  "to-do": "ui-bg-gray-200",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  length,
}) => {
  const elements = getEmptyArray(length).map((_element, index) => {
    if (index === currentIndex) return "current";

    return index < currentIndex ? "done" : "to-do";
  });

  return (
    <div className="ui-w-full ui-flex ui-gap-0.5 ui-h-4">
      {elements.map((status) => (
        <div className={cn("ui-rounded-md ui-grow", styles[status])} />
      ))}
    </div>
  );
};
