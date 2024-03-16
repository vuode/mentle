import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-text-sm ui-font-medium ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 disabled:ui-opacity-50 disabled:ui-pointer-events-none ui-ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "ui-bg-primary ui-text-primary-foreground hover:ui-bg-primary/90",
        blue: "ui-bg-blue-500 ui-text-primary-foreground hover:ui-bg-blue-500/90",
        destructive:
          "ui-bg-destructive ui-text-destructive-foreground hover:ui-bg-destructive/90",
        outline:
          "ui-border ui-border-input hover:ui-bg-accent hover:ui-text-accent-foreground",
        secondary:
          "ui-bg-secondary ui-text-secondary-foreground hover:ui-bg-secondary/80",
        ghost: "hover:ui-bg-accent hover:ui-text-accent-foreground",
        link: "ui-underline-offset-4 hover:ui-underline ui-text-primary",
      },
      size: {
        default: "ui-h-10 ui-py-2 ui-px-4",
        sm: "ui-h-9 ui-px-3 ui-rounded-md",
        lg: "ui-h-11 ui-px-8 ui-rounded-md",
        icon: "ui-h-10 ui-w-10",
        "icon-lg": "ui-h-12 ui-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ size, variant, className }))}
      {...props}
    />
  );
};
