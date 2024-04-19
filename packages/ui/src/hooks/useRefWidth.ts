import { useEffect, useState } from "react";

export const useRefWidth = (
  ref: React.RefObject<HTMLElement>,
  defaultValue: number,
) => {
  const [width, setWidth] = useState(
    ref.current?.getBoundingClientRect().width ?? defaultValue,
  );

  useEffect(() => {
    const listener = () => {
      setWidth(ref.current?.getBoundingClientRect().width ?? defaultValue);
    };

    listener();
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [ref.current]);

  return width;
};
