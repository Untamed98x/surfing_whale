// app/components/RotatingText/RotatingText.tsx
"use client";

import {
  useEffect,
  useState,
  useCallback,
  forwardRef,
} from "react";
import {
  motion,
  AnimatePresence,
  type Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
} from "framer-motion";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition | object;
  exit?: boolean | Target | VariantLabels;
  animatePresenceMode?: "wait" | "sync" | "popLayout";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<HTMLDivElement, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-100%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = useCallback(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= texts.length && !loop) return prev;
        const newIndex = next % texts.length;
        onNext?.(newIndex);
        return newIndex;
      });
    }, [texts.length, loop, onNext]);

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [auto, next, rotationInterval]);

    const splitText = (text: string) => {
      if (splitBy === "characters") return text.split("");
      if (splitBy === "words") return text.split(" ");
      if (splitBy === "lines") return text.split("\n");
      return text.split(splitBy);
    };

    const getStaggerDelay = (index: number, total: number) => {
      if (!staggerDuration) return 0;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = (total - 1) / 2;
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") return Math.random() * staggerDuration * total;
      if (typeof staggerFrom === "number") {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return 0;
    };

    const elements = splitText(texts[currentIndex]);

    return (
      <div ref={ref} className={cn("overflow-hidden", mainClassName)} {...rest}>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentIndex}
            className="inline-flex flex-wrap"
            aria-label={texts[currentIndex]}
          >
            {elements.map((el, i) => (
              <span key={i} className={cn("inline-block overflow-hidden", splitLevelClassName)}>
                <motion.span
                  className={cn("inline-block", elementLevelClassName)}
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={{
                    ...transition,
                    delay: getStaggerDelay(i, elements.length),
                  }}
                >
                  {el === " " ? "\u00A0" : el}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;