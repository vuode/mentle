import {
  NumericFormat,
  NumericFormatProps,
  InputAttributes,
} from "react-number-format";
import { cn } from "../utils";
import { inputVariants } from "./styles";

interface NumberInputProps
  extends Omit<NumericFormatProps<InputAttributes>, "onValueChange"> {
  onValueChange?: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  onValueChange,
  className,
  ...props
}) => {
  const handleValueChange = (stringValue: string) => {
    const numericValue = props.decimalScale
      ? Number.parseFloat(stringValue)
      : Number.parseInt(stringValue, 10);

    if (Number.isNaN(numericValue) || !onValueChange) {
      return;
    }

    onValueChange(numericValue);
  };

  return (
    <NumericFormat
      {...props}
      className={cn(inputVariants({ className }))}
      onValueChange={({ value }) => handleValueChange(value)}
    />
  );
};
