"use client";

import { useEffect, useRef } from "react";

export default function AutoPlayVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // Ignore autoplay errors that can happen on some browsers.
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      playsInline
      muted
      loop
      autoPlay
      preload="metadata"
      className={`rounded-md shadow-sm aspect-[9/16] w-full sm:rounded-xl ${className}`}
    />
  );
}
