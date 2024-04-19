import { useState } from "react";
import { Direction, SwipeCardConfig } from "./swipe-card";

interface UseSwipeCardProps {
  allowSwipe?: boolean;
  onCardSwipe: (direction: Exclude<Direction, null>) => void;
  threshold: number;
  colors: {
    right: string;
    left: string;
    default: string;
  };
}

interface UseSwipeCardReturn {
  currentCardConfig: SwipeCardConfig;
  nextCardConfig: SwipeCardConfig;
  transitioning: boolean;
  direction: Direction;
  setDirection: (direction: Direction) => void;
  onExitComplete: () => void;
}

export const useSwipeCard = ({
  allowSwipe,
  onCardSwipe,
  threshold,
  colors,
}: UseSwipeCardProps): UseSwipeCardReturn => {
  const [internalDirection, setInternalDirection] = useState<Direction>(null);
  const [externalDirection, setExternalDirection] = useState<Direction>(null);
  const [transitioning, setTransitioning] = useState(false);

  const direction = externalDirection ?? internalDirection;

  const currentCardConfig = {
    direction,
    onSwipeEnd: () => {
      if (!direction) return;

      setTransitioning(true);
      onCardSwipe(direction);
    },
    onChangeDirection: (direction: Direction) => {
      setInternalDirection(direction);
    },
    allowSwipe,
    transitioning,
    colors,
    threshold,
  };

  const nextCardConfig = {
    transitioning: false,
    colors,
    threshold,
  };

  const onExitComplete = () => {
    setTransitioning(false);
    setInternalDirection(null);
    setExternalDirection(null);
  };

  return {
    currentCardConfig,
    nextCardConfig,
    transitioning,
    direction,
    setDirection: (direction: Direction) => {
      setTransitioning(true);
      setExternalDirection(direction);
    },
    onExitComplete,
  };
};
