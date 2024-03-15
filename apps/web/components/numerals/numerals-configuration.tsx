"use client";

import { NumberInput } from "@repo/ui/input";
import { Field, Form } from "react-final-form";
import { shuffle } from "../../utils/shuffle";
import {
  CategoryName,
  Config,
  numeralCategories,
} from "../../data/numeral-categories";

interface NumeralsConfigurationProps {
  onSelect: (config: Config[]) => void;
}

export const NumeralsConfiguration: React.FC<NumeralsConfigurationProps> = ({
  onSelect,
}) => {
  const onSubmit = (values: Record<CategoryName, number>) => {
    const entries = Object.entries(values) as [CategoryName, number][];

    const configs = entries.flatMap(
      ([key, count]) =>
        numeralCategories.find(({ name }) => name === key)?.generator(count) ??
        [],
    );

    onSelect(shuffle(configs));
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {numeralCategories.map((category) => (
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
