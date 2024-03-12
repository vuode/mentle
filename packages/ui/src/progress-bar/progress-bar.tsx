import { cn } from "../utils";

interface ProgressBarProps {
  currentIndex: number;
  length: number;
}

const getEmptyArray = (length: number) => Array.from({ length }).fill(null);

const styles = {
  done: "bg-blue-500",
  current: "bg-blue-500 animate-pulse",
  "to-do": "bg-gray-200",
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
    <div className="w-full flex gap-0.5 h-4">
      {elements.map((status) => (
        <div className={cn("rounded-md grow", styles[status])} />
      ))}
    </div>
  );
};
