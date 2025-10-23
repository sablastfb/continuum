import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { Direction } from "../../data/store/LayoutStore";
import { DefaultIconSize } from "../../data/types/CanvasConstants";

export interface ScrollableToolbarProps {
  direction: Direction;
  children: ReactNode;
  className?: string;
  scrollAmount?: number;
}

const ScrollableToolbar = ({
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
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    } else {
      setCanScrollStart(container.scrollTop > 0);
      setCanScrollEnd(
        container.scrollTop < container.scrollHeight - container.clientHeight
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
  }, [children]);

  const scroll = (direction: "start" | "end") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollValue = direction === "start" ? -scrollAmount : scrollAmount;

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

    e.preventDefault();

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
      className={`flex h-full w-full ${
        isHorizontal ? "flex-row" : "flex-col"
      } items-center gap-1`}
    >
      {canScrollStart && (
        <button
          onClick={() => scroll("start")}
          className="rounded  transition-colors h-full "
          aria-label={`Scroll ${isHorizontal ? "left" : "up"}`}
        >
          <StartIcon size={DefaultIconSize} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        onWheel={handleWheel}
        className={`
          ${className}
          ${
            isHorizontal
              ? "overflow-x-auto overflow-y-hidden"
              : "overflow-y-auto overflow-x-hidden"
          }
          scrollbar-hide
          flex ${isHorizontal ? "flex-row" : "flex-col"}
        `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {canScrollEnd && (
        <div
          onClick={() => scroll("end")}
          className=" rounded p-1 transition-colors flex-shrink-0 h-full"
          aria-label={`Scroll ${isHorizontal ? "right" : "down"}`}
        >
          <EndIcon size={DefaultIconSize} />
        </div>
      )}
    </div>
  );
};

export default ScrollableToolbar;
