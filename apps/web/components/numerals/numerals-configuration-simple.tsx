import { Form } from "react-final-form";
import { shuffle } from "../../utils/shuffle";
import { numeralCategoryConfigs } from "@mentle/language-utils/sentences";
import { Button } from "@mentle/ui/button";
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
  count: z
    .number({
      required_error: "Dodaj przynajmniej jedno zadanie",
    })
    .min(1, "Dodaj przynajmniej jedno zadanie")
    .max(50, "Nie można dodać więcej niż 50 zadań"),
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
          <form className="grid gap-2" onSubmit={handleSubmit}>
            <NumberInputField
              key="count"
              name="count"
              label="Ilość zadań"
              decimalScale={0}
              showError
            />
            <Button className="" type="submit">
              Zacznij
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};
