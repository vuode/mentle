import { useField, FieldInputProps } from "react-final-form";
import { Input, InputProps } from "@repo/ui/input";

export interface InputFieldProps
  extends Exclude<InputProps, keyof FieldInputProps<string, HTMLElement>> {
  name: string;
  label?: string;
  showError?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  showError,
  ...props
}) => {
  const { input, meta } = useField<string>(name);

  if (label) {
    return (
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={`${name}Field`}
        >
          {label}
        </label>
        <Input {...props} {...input} id={`${name}Field`} />
        {showError && (
          <div className="h-5 text-xs text-red-500">{meta.error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Input {...input} {...props} />
      {showError && (
        <div className="h-5 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
