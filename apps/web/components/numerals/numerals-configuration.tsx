import { Form } from "react-final-form";
import { shuffle } from "../../utils/shuffle";
import {
  NumeralCategory,
  numeralCategoryConfigs,
} from "@repo/language-utils/sentences";
import { Button } from "@repo/ui/button";
import { z } from "zod";
import { NumberInputField } from "../form/NumberInputField";
import { v4 as uuid } from "uuid";

interface NumeralsConfigurationProps {
  onSelect: (token: string) => void;
}

interface FormValues extends Record<NumeralCategory, number | undefined> {}

const countType = z.optional(z.number().min(0).max(50));

const schema = z.object({
  ends_1: countType,
  ends_2_4: countType,
  mp: countType,
  rest: countType,
} satisfies Record<keyof FormValues, z.Schema>);

export const NumeralsConfiguration: React.FC<NumeralsConfigurationProps> = ({
  onSelect,
}) => {
  const onSubmit = ({ ...config }: FormValues) => {
    const tasks = numeralCategoryConfigs.flatMap(({ name }) =>
      Array.from({ length: config[name] ?? 0 }).map(() => name),
    );

    const token = btoa(
      JSON.stringify({ tasks: shuffle(tasks), token: uuid() }),
    );

    onSelect(token);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const validation = schema.safeParse(values);

          if (validation.success) {
            return;
          }

          return validation.error.formErrors.fieldErrors;
        }}
      >
        {({ handleSubmit }) => (
          <form className="grid gap-2 sm:grid-cols-2" onSubmit={handleSubmit}>
            {numeralCategoryConfigs.map(({ name, title }) => (
              <NumberInputField
                key={name}
                name={name}
                label={title}
                decimalScale={0}
                showError
              />
            ))}
            <Button className="sm:col-span-2" type="submit">
              Zacznij
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};
