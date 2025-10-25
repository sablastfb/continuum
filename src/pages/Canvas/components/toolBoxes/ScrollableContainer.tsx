import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  DefaultIconSize,
} from "../../data/types/CanvasConstants";

type Direction = "horizontal" | "vertical";

export interface ScrollableToolbarProps {
  direction: Direction;
  children: ReactNode;
  className?: string;
  scrollAmount?: number;
}

const ScrollableContainer = ({
  direction,
  children,
  className = "",
  scrollAmount = 50,
}: ScrollableToolbarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const isHorizontal = direction === "horizontal";

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isHorizontal) {
      setCanScrollStart(container.scrollLeft > 0);
      setCanScrollEnd(
        container.scrollLeft+2 < container.scrollWidth - container.clientWidth
      );
    } else {
      setCanScrollStart(container.scrollTop > 0);
      setCanScrollEnd(
       container.scrollTop+2 < container.scrollHeight - container.clientHeight
      );
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [children, isHorizontal]);

  const scroll = (scrollDirection: "start" | "end") => {
    debugger;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollValue =
      scrollDirection === "start" ? -scrollAmount : scrollAmount;

    if (isHorizontal) {
      container.scrollTo({
        left: container.scrollLeft + scrollValue,
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        top: container.scrollTop + scrollValue,
        behavior: "smooth",
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isHorizontal) {
      container.scrollTo({
        left: container.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        top: container.scrollTop + e.deltaY,
        behavior: "smooth",
      });
    }
  };

  const StartIcon = isHorizontal ? ChevronLeft : ChevronUp;
  const EndIcon = isHorizontal ? ChevronRight : ChevronDown;

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row h-full" : "flex-col "
      } items-center`}
    >
      <div
        onClick={() => scroll("start")}
        className={`pointer-events-auto   transition-colors  cursor-pointer  flex  justify-center bg-black/20 dark:bg-white/30  backdrop-blur-sm
        ${isHorizontal ? "h-11 flex items-center rounded-l-2xl" : "w-full rounded-t-2xl"}
        ${!canScrollStart && 'hidden'}
        `}
      >
        <StartIcon size={DefaultIconSize / 1.5} />
      </div>
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        onWheel={handleWheel}
        className={`
          ${className}
          ${
            isHorizontal
              ? "overflow-x-auto overflow-y-hidden "
              : "overflow-y-auto overflow-x-hidden "
          }
          flex ${isHorizontal ? "flex-row" : "flex-col"}
          ${!canScrollStart && (direction === 'vertical' ? 'rounded-t-2xl' : 'rounded-l-2xl')}
          ${!canScrollEnd && (direction === 'vertical' ? 'rounded-b-2xl' : 'rounded-r-2xl')}
          `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

    <div
        onClick={() => scroll("end")}
        className={`pointer-events-auto   transition-colors  cursor-pointer  flex  justify-center bg-black/20 dark:bg-white/30  backdrop-blur-sm
        ${isHorizontal ? "h-11 flex items-center rounded-r-2xl" : "w-full rounded-b-2xl"}
          ${!canScrollEnd && 'hidden'}
        `}
        
        aria-label={`Scroll ${isHorizontal ? "right" : "down"}`}
      >
        <EndIcon size={DefaultIconSize / 1.5} />
      </div>
    </div>
  );
};

export default ScrollableContainer;
