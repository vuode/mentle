import { useField, FieldInputProps } from "react-final-form";
import { NumberInput, NumberInputProps } from "@repo/ui/input";

export interface NumberInputFieldProps
  extends Exclude<
    NumberInputProps,
    keyof FieldInputProps<string, HTMLElement>
  > {
  name: string;
  label?: string;
  showError?: boolean;
}

export const NumberInputField: React.FC<NumberInputFieldProps> = ({
  name,
  label,
  showError,
  ...props
}) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: { type, onChange, ...input },
    meta,
  } = useField<number>(name);

  if (label) {
    return (
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={`${name}Field`}
        >
          {label}
        </label>
        <NumberInput
          {...props}
          {...input}
          id={`${name}Field`}
          onValueChange={onChange}
        />
        {showError && (
          <div className="h-5 text-xs text-red-500">{meta.error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <NumberInput {...input} {...props} onValueChange={onChange} />
      {showError && (
        <div className="h-5 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
