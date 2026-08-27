import React, { useState } from "react";
import {
  Check,
  Copy,
  Terminal,
  FileJson,
  FileCode,
  FileCode2,
} from "lucide-react";
import { TypeScriptIcon, JavaScriptIcon, ReactIcon } from "./brand-icons";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  title?: string;
  style?: React.CSSProperties;
  /** Whether the code block is expandable (collapsed by default with fade mask) */
  expandable?: boolean;
  /** Initial expansion state */
  defaultExpanded?: boolean;
  /** Maximum height when collapsed */
  collapsedMaxHeight?: number | string;
  /** Whether to hide top filename/copy header (e.g. inside ComponentPreview) */
  hideHeader?: boolean;
}

function getLanguageIcon(language?: string, filename?: string) {
  const target = (filename || language || "").toLowerCase();
  if (
    target.endsWith(".sh") ||
    target.endsWith(".bash") ||
    target === "bash" ||
    target === "sh" ||
    target === "shell"
  ) {
    return <Terminal size={14} style={{ flexShrink: 0, opacity: 0.8 }} />;
  }
  if (target.endsWith(".json") || target === "json") {
    return <FileJson size={14} style={{ flexShrink: 0, opacity: 0.8 }} />;
  }
  if (target.endsWith(".css") || target === "css") {
    return <FileCode size={14} style={{ flexShrink: 0, opacity: 0.8 }} />;
  }
  if (target.endsWith(".tsx") || target === "tsx") {
    return <ReactIcon size={14} />;
  }
  if (target.endsWith(".jsx") || target === "jsx") {
    return <ReactIcon size={14} />;
  }
  if (target.endsWith(".ts") || target === "typescript" || target === "ts") {
    return <TypeScriptIcon size={14} />;
  }
  if (
    target.endsWith(".js") ||
    target.endsWith(".mjs") ||
    target === "javascript" ||
    target === "js"
  ) {
    return <JavaScriptIcon size={14} />;
  }
  return <FileCode2 size={14} style={{ flexShrink: 0, opacity: 0.8 }} />;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  title,
  style,
  expandable = false,
  defaultExpanded = false,
  collapsedMaxHeight = "240px",
  hideHeader = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const displayName =
    filename || title || (language ? language.toLowerCase() : "code");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* noop */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");
  const isMultiLine = lines.length > 1;
  const isCollapsed = expandable && !isExpanded;

  return (
    <div
      className={`docs-codeblock${expandable ? " docs-codeblock--expandable" : ""}`}
      style={style}
    >
      {!hideHeader && (
        <div className="docs-codeblock-head">
          <div className="docs-codeblock-head-left">
            {getLanguageIcon(language, filename || title)}
            <span className="docs-codeblock-filename">{displayName}</span>
          </div>

          <div className="docs-codeblock-head-right">
            {expandable && (
              <button
                type="button"
                className="docs-codeblock-expand-toggle"
                onClick={() => setIsExpanded((v) => !v)}
                aria-label={isExpanded ? "Collapse code" : "Expand code"}
              >
                <span>{isExpanded ? "Collapse" : "Expand"}</span>
              </button>
            )}

            <button
              type="button"
              className={`docs-codeblock-copy${copied ? " ok" : ""}`}
              onClick={copy}
              title={copied ? "Copied!" : "Copy code"}
              aria-label={copied ? "Copied" : "Copy"}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      )}

      <div
        className={`docs-codeblock-body${isCollapsed ? " is-collapsed" : ""}`}
        style={isCollapsed ? { maxHeight: collapsedMaxHeight } : undefined}
      >
        <pre className="docs-codeblock-pre">
          <code className="docs-codeblock-code-lines">
            {isMultiLine
              ? lines.map((line, idx) => (
                  <div key={idx} className="docs-codeblock-line">
                    <span className="docs-codeblock-linenum" aria-hidden="true">
                      {idx + 1}
                    </span>
                    <span className="docs-codeblock-linecode">{line || " "}</span>
                  </div>
                ))
              : <code>{code}</code>}
          </code>
        </pre>

        {isCollapsed && (
          <div className="docs-codeblock-fade-mask">
            <button
              type="button"
              className="docs-codeblock-expand-pill"
              onClick={() => setIsExpanded(true)}
            >
              <span>Expand Code</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
