import {
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { cn } from "../utils";
import { useEffect, useState } from "react";

interface SwipeCardProps {
  className?: string;
  children: React.ReactNode;
  onDirectionChange?: (direction: "right" | "left" | null) => void;
  onSwipeEnd?: (direction: "right" | "left") => void;
  allowSwipe?: boolean;
  onClick?: () => void;
  exit?: boolean;
  onExitEnd?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  className,
  children,
  onDirectionChange,
  onSwipeEnd,
  exit,
  onExitEnd,
  allowSwipe,
  onClick,
}) => {
  const [direction, setDirection] = useState<"right" | "left" | null>(null);
  const animation = useAnimation();

  const x = useMotionValue(0);
  useMotionValueEvent(x, "change", (value) => {
    const progress = (value * 2) / window.innerWidth;

    if (progress >= 0.15) {
      setDirection("right");
      return;
    }

    if (progress <= -0.15) {
      setDirection("left");
      return;
    }

    setDirection(null);
  });

  const rotateZ = useTransform(x, [-200, 200], [-10, 10]);

  useEffect(() => {
    if (!onDirectionChange) return;
    onDirectionChange(direction);
  }, [direction]);

  useEffect(() => {
    if (!exit) {
      animation.set({
        x: 0,
        opacity: 1,
      });
      return;
    }

    animation
      .start(
        {
          x: direction === "left" ? -1000 : 1000,
          opacity: 0,
        },
        { duration: 0.5 },
      )
      .then(() => {
        if (!onExitEnd) return;
        onExitEnd();
      });
  }, [exit]);

  return (
    <motion.div
      className={cn(
        "ui-p-4 ui-h-full ui-bg-whit ui-border ui-border-gray-200 ui-shadow ui-rounded-xl ui-overflow-hidden ui-transition-colors",
        {
          "ui-bg-white": !direction,
          "ui-bg-green-100": direction === "right",
          "ui-bg-red-100": direction === "left",
        },
        {
          "ui-cursor-pointer": Boolean(onClick && !allowSwipe),
          "ui-cursor-grab": allowSwipe,
        },
        className,
      )}
      style={{ x, rotateZ }}
      animate={animation}
      drag={allowSwipe}
      dragElastic
      dragSnapToOrigin
      whileDrag={{ scale: 1.1 }}
      onDragEnd={() => {
        if (!direction || !onSwipeEnd) return;
        onSwipeEnd(direction);
      }}
      onClick={() => {
        if (!onClick || allowSwipe) return;
        onClick();
      }}
    >
      {children}
    </motion.div>
  );
};
