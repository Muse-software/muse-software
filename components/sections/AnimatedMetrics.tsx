"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MetricProps {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedMetrics({ metrics }: { metrics: MetricProps[] }) {
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLDivElement;
            const valueElement = element.querySelector(".metric-value");
            const valueText = element.getAttribute("data-value");
            
            // Extract number from value (e.g., "42%" -> 42, "$18.4M" -> 18.4)
            const match = valueText?.match(/[\d.]+/);
            if (match && valueElement) {
              const targetValue = parseFloat(match[0]);
              const suffix = element.getAttribute("data-suffix") || "";
              const prefix = element.getAttribute("data-prefix") || "";

              gsap.fromTo(
                valueElement,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  onStart: () => {
                    const animatedValue = { val: 0 };
                    gsap.to(animatedValue, {
                      val: targetValue,
                      duration: 2.5,
                      ease: "power2.out",
                      onUpdate: () => {
                        const displayValue =
                          targetValue % 1 === 0
                            ? Math.round(animatedValue.val)
                            : animatedValue.val.toFixed(1);
                        if (valueElement) {
                          valueElement.textContent = `${prefix}${displayValue}${suffix}`;
                        }
                      },
                    });
                  },
                }
              );
            }

            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.3 }
    );

    metricsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, idx) => {
        const prefix = metric.prefix || "";
        const suffix = metric.suffix || "";
        
        return (
          <div
            key={idx}
            ref={(el) => {
              metricsRef.current[idx] = el;
            }}
            data-value={metric.value}
            data-prefix={prefix}
            data-suffix={suffix}
            className="glass-panel p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="space-y-3">
              <div className="metric-value text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--gold)] via-[var(--coral)] to-[var(--purple)] bg-clip-text text-transparent">
                {metric.value}
              </div>
              <p className="text-sm md:text-base text-white/70 font-medium">
                {metric.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
