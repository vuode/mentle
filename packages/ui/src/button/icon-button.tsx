import clsx from "clsx";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "blue" | "green";
  size?: "base" | "large";
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  color = "blue",
  size = "base",
  ...props
}) => {
  return (
    <button
      className={clsx("p-2.5 text-white rounded-full focus:ring-4", {
        "bg-blue-500 hover:bg-blue-600 ring-blue-200": color === "blue",
        "p-2.5": size === "base",
        "p-3.5": size === "large",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
