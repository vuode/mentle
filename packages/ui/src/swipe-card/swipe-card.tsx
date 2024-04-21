import { forwardRef, useRef } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  motion,
  useIsPresent,
} from "framer-motion";
import { useRefWidth } from "../hooks/useRefWidth";
import { cn } from "../utils";

export type Direction = "right" | "left" | null;

export interface SwipeCardConfig {
  direction?: Direction;
  transitioning?: boolean;
  allowSwipe?: boolean;
  onChangeDirection?: (direction: Direction) => void;
  onSwipeEnd?: () => void;
  colors: {
    right: string;
    left: string;
    default: string;
  };
  threshold: number;
}

interface SwipeCardProps {
  className?: string;
  children: React.ReactNode;
  config: SwipeCardConfig;
  onClick?: () => void;
  pending?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = forwardRef<
  HTMLDivElement,
  SwipeCardProps
>(({ className, children, config, onClick, pending }, ref) => {
  const widthRef = useRef<HTMLDivElement>(null);
  const width = useRefWidth(widthRef, 200);
  const present = useIsPresent();

  const variants = {
    bg: (direction: Direction) => ({
      backgroundColor:
        !config.transitioning && direction
          ? direction === "right"
            ? config.colors.right
            : config.colors.left
          : config.colors.default,
    }),
    exit: (direction: Direction) => ({
      x: direction ? (direction === "right" ? 1.2 * width : 1.2 * -width) : 0,
      opacity: 0,
    }),
    small: {
      scale: 0.9,
      translateY: "10%",
    },
    big: {
      scale: 1,
      translateY: 0,
    },
  };

  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-10, 10]);
  useMotionValueEvent(x, "change", (value) => {
    if (!config.onChangeDirection) {
      return;
    }

    const progress = value / width;

    if (progress >= config.threshold) {
      config.onChangeDirection("right");
      return;
    }

    if (progress <= -config.threshold) {
      config.onChangeDirection("left");
      return;
    }

    config.onChangeDirection(null);
  });

  return (
    <motion.div
      className={cn("ui-absolute", !present && "ui-z-10", className)}
      ref={ref}
      style={{
        x,
        rotateZ,
        backgroundColor: config.colors.default,
      }}
      custom={config.direction}
      variants={variants}
      initial={pending ? "small" : undefined}
      animate={pending ? ["bg", "small"] : ["bg", "big"]}
      exit={["exit", "bg"]}
      drag={config.allowSwipe}
      dragElastic={0.8}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={config.onSwipeEnd}
      onClick={onClick}
    >
      <div className="w-full h-full" ref={widthRef}>
        {children}
      </div>
    </motion.div>
  );
});
