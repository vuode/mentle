import { NumericFormat } from "react-number-format";
import { cn } from "../utils";

interface NumberInputProps {
  value?: number;
  onValueChange?: (value: number) => void;
  decimalScale?: number;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onValueChange,
  decimalScale,
  className,
}) => {
  const handleValueChange = (stringValue: string) => {
    const numericValue = decimalScale
      ? Number.parseFloat(stringValue)
      : Number.parseInt(stringValue, 10);

    if (Number.isNaN(numericValue) || !onValueChange) {
      return;
    }

    onValueChange(numericValue);
  };

  return (
    <NumericFormat
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      decimalScale={decimalScale}
      value={value}
      onValueChange={({ value }) => handleValueChange(value)}
    />
  );
};
