interface ProgressBarProps {
  element: number;
  total: number;
}

const getEmptyArray = (length: number) => Array.from({ length }).fill(null);

export const ProgressBar: React.FC<ProgressBarProps> = ({ element, total }) => {
  const data = getEmptyArray(total).map((_element, index) => {
    if (index < element) {
      return "bg-blue-400";
    }

    if (index === element) {
      return "bg-blue-500 animate-pulse";
    }

    return "bg-gray-200";
  });

  return (
    <div className="w-full flex gap-0.5 h-4">
      {data.map((className) => (
        <div className={"rounded-md border-gray-200 grow " + className} />
      ))}
    </div>
  );
};
