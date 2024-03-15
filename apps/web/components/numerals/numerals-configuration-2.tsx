import { NumberInput } from "@repo/ui/number-input";
import { Field, Form } from "react-final-form";
import { shuffle } from "../../utils/shuffle";
import {
  NumeralCategory,
  numeralCategoryConfigs,
} from "@repo/language-utils/sentences";

interface NumeralsConfigurationProps {
  onSelect: (token: string) => void;
}

export const NumeralsConfiguration: React.FC<NumeralsConfigurationProps> = ({
  onSelect,
}) => {
  const onSubmit = (values: Record<NumeralCategory, number>) => {
    const entries = Object.entries(values) as [NumeralCategory, number][];

    const configs = entries.flatMap(([key, length]) =>
      Array.from({ length }).map(() => key),
    );

    const token = btoa(
      JSON.stringify({ tasks: shuffle(configs), token: "test" }),
    );

    onSelect(token);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {numeralCategoryConfigs.map((category) => (
              <div key={category.name}>
                <div>{category.title}</div>
                <Field name={category.name}>
                  {({ input }) => (
                    <NumberInput
                      value={input.value}
                      onValueChange={input.onChange}
                      decimalScale={0}
                    />
                  )}
                </Field>
              </div>
            ))}
            <button type="submit">Zacznij</button>
          </form>
        )}
      </Form>
    </div>
  );
};
