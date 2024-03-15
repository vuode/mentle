import {
  NumericFormat,
  NumericFormatProps,
  InputAttributes,
} from "react-number-format";
import { cn } from "../utils";
import { inputVariants } from "./styles";

export interface NumberInputProps
  extends Omit<NumericFormatProps<InputAttributes>, "onValueChange"> {
  onValueChange?: (value?: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  onValueChange,
  className,
  ...props
}) => {
  const handleValueChange = (stringValue: string) => {
    if (!onValueChange) {
      return;
    }

    if (stringValue === "") {
      onValueChange(undefined);
      return;
    }

    const numericValue = props.decimalScale
      ? Number.parseFloat(stringValue)
      : Number.parseInt(stringValue, 10);

    if (Number.isNaN(numericValue)) {
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
