import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PnpmIcon, NpmIcon, YarnIcon, BunIcon } from "./brand-icons";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export const PACKAGE_MANAGERS: PackageManager[] = [
  "pnpm",
  "npm",
  "yarn",
  "bun",
];

export interface PackageManagerBlockProps {
  /** Record of package manager -> command string */
  commands: Partial<Record<PackageManager, string>>;
  /** Default selected tab (default: 'pnpm') */
  defaultTab?: PackageManager;
  style?: React.CSSProperties;
}

function getPmIcon(pm: PackageManager) {
  switch (pm) {
    case "pnpm":
      return <PnpmIcon size={13} />;
    case "npm":
      return <NpmIcon size={13} />;
    case "yarn":
      return <YarnIcon size={13} />;
    case "bun":
      return <BunIcon size={13} />;
    default:
      return null;
  }
}

/**
 * Reusable tabbed code block with pnpm/npm/yarn/bun tabs and brand icons.
 */
export const PackageManagerBlock: React.FC<PackageManagerBlockProps> = ({
  commands,
  defaultTab = "pnpm",
  style,
}) => {
  const available = PACKAGE_MANAGERS.filter((pm) => commands[pm] !== undefined);
  const [active, setActive] = useState<PackageManager>(
    available.includes(defaultTab) ? defaultTab : (available[0] ?? "pnpm"),
  );
  const [copied, setCopied] = useState(false);

  const currentCmd = commands[active] ?? "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCmd).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="docs-tabbed-codeblock" style={style}>
      <div className="docs-tabbed-codeblock-header">
        <div className="docs-tabbed-codeblock-tabs">
          {available.map((pm) => (
            <button
              key={pm}
              type="button"
              className={`docs-tabbed-codeblock-tab${active === pm ? " active" : ""}`}
              onClick={() => setActive(pm)}
            >
              {getPmIcon(pm)}
              <span>{pm}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`docs-tabbed-codeblock-copy${copied ? " copied" : ""}`}
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy command"}
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? (
            <Check size={13} style={{ color: "#22c55e" }} />
          ) : (
            <Copy size={13} />
          )}
        </button>
      </div>

      <pre className="docs-tabbed-codeblock-pre">
        <code>{currentCmd}</code>
      </pre>
    </div>
  );
};
