"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImagePlaceholder({
  src,
  alt,
  className = "",
}: ImagePlaceholderProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            gsap.fromTo(
              imageRef.current,
              { opacity: 0, y: 20, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imageRef}
      className={`rounded-xl overflow-hidden shadow-2xl ${className}`}
      style={{
        background: src.startsWith("linear-gradient") ? src : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: "16/9",
        minHeight: "300px",
        opacity: 0,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {src.startsWith("linear-gradient") && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
            }}
          />
        )}
        {!src.startsWith("linear-gradient") && (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
