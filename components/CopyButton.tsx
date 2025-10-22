"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  value: string;
  label?: string;
}

export function CopyButton({ value, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="ml-auto rounded-full text-xs"
      onClick={handleCopy}
    >
      {copied ? "Copied" : label}
    </Button>
  );
}
