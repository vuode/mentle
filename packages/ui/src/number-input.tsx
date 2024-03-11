import { NumericFormat } from "react-number-format";

interface NumberInputProps {
  value?: number;
  onValueChange?: (value: number) => void;
  decimalScale?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onValueChange,
  decimalScale,
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
      decimalScale={decimalScale}
      value={value}
      onValueChange={({ value }) => handleValueChange(value)}
    />
  );
};
