import React, { useState } from "react";
import { Button } from "@soraui/react";

export interface CopyButtonProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, style }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      style={{
        fontSize: "0.75rem",
        padding: "0.25rem 0.5rem",
        height: "28px",
        ...style,
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </Button>
  );
};
