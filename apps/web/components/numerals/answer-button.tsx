import { Button } from "@mentle/ui/button";
import { cn } from "@mentle/ui/utils";
import { Check, X } from "lucide-react";

interface AnswerButtonProps {
  type: "right" | "left";
  direction: "right" | "left" | null;
  onClick: () => void;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  type,
  direction,
  onClick,
}) => (
  <Button
    key={type}
    onClick={onClick}
    className={cn(
      "rounded-full",
      type === "left"
        ? { "bg-red-200": direction === "left" }
        : { "bg-green-200": direction === "right" },
    )}
    size="icon-xl"
    variant="secondary"
  >
    {type === "left" ? <X /> : <Check />}
  </Button>
);
