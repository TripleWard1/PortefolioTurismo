// Adaptado de "Variable Text Proximity" (Hyperiux Vault: https://vault.hyperiux.com).
// Cada letra interpola os eixos variáveis da fonte (peso e tamanho ótico) consoante
// a distância ao cursor. Usa a Newsreader variável do site em vez de carregar outra fonte.
"use client";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MutableRefObject,
} from "react";

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function usePointerPositionRef(
  containerRef: MutableRefObject<HTMLElement | null>,
) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

type Falloff = "linear" | "exponential" | "gaussian";

interface ProximityLettersProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: Falloff;
  className?: string;
  style?: CSSProperties;
}

/**
 * The reveal engine: splits `label` into per-letter spans and, on every frame,
 * interpolates each letter's `font-variation-settings` between the `from` and
 * `to` strings based on its distance from the (smoothed) pointer.
 */
export const ProximityLetters = forwardRef<HTMLSpanElement, ProximityLettersProps>(
  (props, ref) => {
    const {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className = "",
      style,
      ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = usePointerPositionRef(containerRef);
    const smoothedPositionRef = useRef({ x: 0, y: 0 });
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({
      x: null,
      y: null,
    });
    const reducedMotionRef = useRef(false);
    const [fontReady, setFontReady] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const updatePreference = () => {
        reducedMotionRef.current = mediaQuery.matches;
      };
      updatePreference();
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
      let cancelled = false;
      const done = () => {
        if (!cancelled) setFontReady(true);
      };
      // A fonte variável do site (Newsreader) vem do next/font: basta esperar que esteja pronta
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(done).catch(done);
      } else {
        done();
      }
      return () => {
        cancelled = true;
      };
    }, []);

    // Lock each letter to the wider of its from/to widths so heavier glyphs
    // don't reflow the paragraph.
    useEffect(() => {
      if (!fontReady) return;
      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) return;
        const prevSettings = letterRef.style.fontVariationSettings;

        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        const fromWidth = letterRef.getBoundingClientRect().width;

        letterRef.style.fontVariationSettings = toFontVariationSettings;
        const toWidth = letterRef.getBoundingClientRect().width;

        letterRef.style.fontVariationSettings = prevSettings;
        letterRef.style.display = "inline-block";
        letterRef.style.textAlign = "center";
        letterRef.style.width = `${Math.max(fromWidth, toWidth)}px`;
      });
    }, [fromFontVariationSettings, toFontVariationSettings, label, fontReady]);

    const parsedSettings = useMemo(() => {
      const parseSettings = (settingsStr: string) =>
        new Map(
          settingsStr
            .split(",")
            .map((s) => s.trim())
            .map((s) => {
              const [name, value] = s.split(" ");
              return [name.replace(/['"]/g, ""), parseFloat(value)];
            }),
        );

      const fromSettings = parseSettings(fromFontVariationSettings);
      const toSettings = parseSettings(toFontVariationSettings);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return norm ** 2;
        case "gaussian":
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case "linear":
        default:
          return norm;
      }
    };

    useAnimationFrame(() => {
      if (!containerRef?.current) return;
      const target = mousePositionRef.current;
      const smoothed = smoothedPositionRef.current;

      if (reducedMotionRef.current) {
        smoothed.x = target.x;
        smoothed.y = target.y;
      } else {
        const lerpFactor = 0.18;
        smoothed.x += (target.x - smoothed.x) * lerpFactor;
        smoothed.y += (target.y - smoothed.y) * lerpFactor;
      }

      if (
        lastPositionRef.current.x !== null &&
        Math.abs(smoothed.x - lastPositionRef.current.x) < 0.01 &&
        Math.abs(smoothed.y - (lastPositionRef.current.y as number)) < 0.01
      ) {
        return;
      }
      lastPositionRef.current = { x: smoothed.x, y: smoothed.y };
      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(
          smoothed.x,
          smoothed.y,
          letterCenterX,
          letterCenterY,
        );

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }
        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue =
              fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(", ");
        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });
    });
    const words = label.split(" ");
    let letterIndex = 0;
    return (
      <span
        ref={ref}
        style={{ display: "inline", ...style }}
        className={className}
        {...restProps}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              return (
                <span
                  key={currentLetterIndex}
                  ref={(el) => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings:
                      interpolatedSettingsRef.current[currentLetterIndex],
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);
ProximityLetters.displayName = "ProximityLetters";
