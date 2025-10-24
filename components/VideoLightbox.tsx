"use client";

import * as React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function VideoLightbox({
  src,
  poster,
  href,
  thumb,
}: {
  src: string;
  poster?: string;
  href: string;
  thumb: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const vidRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (open) {
      v.currentTime = 0;
      v.muted = false;
      v.volume = 1;
      const play = async () => {
        try {
          await v.play();
        } catch {
          /* autoplay may still fail silently */
        }
      };
      play();
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full">{thumb}</button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[min(90vw,320px)] sm:max-w-[min(75vw,360px)] lg:max-w-[min(60vw,420px)] p-0 overflow-hidden">
        <div className="bg-black">
          <video
            ref={vidRef}
            src={src}
            poster={poster}
            playsInline
            controls
            autoPlay
            className="w-full h-auto max-h-[80vh]"
          />
        </div>
        <div className="p-4">
          <Button asChild className="w-full">
            <a href={href} target="_blank" rel="noreferrer">
              Watch on TikTok
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
