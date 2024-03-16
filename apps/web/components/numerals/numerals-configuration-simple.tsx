import { Form } from "react-final-form";
import { shuffle } from "../../utils/shuffle";
import { numeralCategoryConfigs } from "@repo/language-utils/sentences";
import { Button } from "@repo/ui/button";
import { z } from "zod";
import { NumberInputField } from "../form/NumberInputField";
import { v4 as uuid } from "uuid";

interface NumeralsConfigurationSimpleProps {
  onSelect: (token: string) => void;
}

interface FormValues {
  count: number;
}

const schema = z.object({
  count: z.number().min(1).max(50),
} satisfies Record<keyof FormValues, z.Schema>);

const validate = (values: FormValues) => {
  const validation = schema.safeParse(values);

  if (validation.success) {
    return;
  }

  return validation.error.formErrors.fieldErrors;
};

export const NumeralsConfigurationSimple: React.FC<
  NumeralsConfigurationSimpleProps
> = ({ onSelect }) => {
  const onSubmit = ({ count }: FormValues) => {
    const defaultLength = Math.floor(count / 4);
    const restLength = count - defaultLength * 3;

    const tasks = numeralCategoryConfigs.flatMap(({ name }) =>
      Array.from({ length: name === "rest" ? restLength : defaultLength }).map(
        () => name,
      ),
    );

    const token = btoa(
      JSON.stringify({ tasks: shuffle(tasks), token: uuid() }),
    );

    onSelect(token);
  };

  return (
    <div>
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <NumberInputField
              key="count"
              name="count"
              label="Ilość zadań"
              decimalScale={0}
              showError
            />
            <Button type="submit">Zacznij</Button>
          </form>
        )}
      </Form>
    </div>
  );
};
