import {
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { cn } from "../utils";
import { useEffect, useRef, useState } from "react";

interface SwipeCardProps {
  className?: string;
  children: React.ReactNode;
  onDirectionChange?: (direction: "right" | "left" | null) => void;
  forceDirection?: "right" | "left" | null;
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
  forceDirection,
  onSwipeEnd,
  exit,
  onExitEnd,
  allowSwipe,
  onClick,
}) => {
  const [direction, setDirection] = useState<"right" | "left" | null>(null);
  const animation = useAnimation();

  const cardRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState<number>(500);

  useEffect(() => {
    setCardWidth(cardRef.current?.getBoundingClientRect().width ?? 500);

    const listener = () => {
      setCardWidth(cardRef.current?.getBoundingClientRect().width ?? 500);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [cardRef.current]);

  const xExit = {
    right: cardWidth,
    left: -cardWidth,
    default: 0,
  };

  const x = useMotionValue(0);
  useMotionValueEvent(x, "change", (value) => {
    const progress = value / cardWidth;

    if (progress >= 0.3) {
      setDirection("right");
      return;
    }

    if (progress <= -0.3) {
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

    let finalX = 0;

    if (!forceDirection) {
      finalX = (direction && xExit[direction]) ?? xExit.default;
    }

    if (forceDirection) {
      finalX = xExit[forceDirection];
    }

    animation
      .start(
        {
          x: finalX,
          opacity: 0,
        },
        { duration: 0.3 },
      )
      .then(() => {
        if (!onExitEnd) return;
        onExitEnd();
      });
  }, [exit]);

  return (
    <motion.div
      ref={cardRef}
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
