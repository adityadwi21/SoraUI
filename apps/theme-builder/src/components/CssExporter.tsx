import { useState } from 'react';
import type { ThemeTokens } from '../presets';

interface CssExporterProps {
  tokens: ThemeTokens;
}

export function CssExporter({ tokens }: CssExporterProps) {
  const [copied, setCopied] = useState(false);

  const cssCode = `:root {
  /* SoraUI Theme: ${tokens.name} (${tokens.mode}) */
  --ui-primary: ${tokens.primary};
  --ui-primary-foreground: ${tokens.primaryForeground};
  --ui-secondary: ${tokens.secondary};
  --ui-secondary-foreground: ${tokens.secondaryForeground};
  --ui-background: ${tokens.background};
  --ui-foreground: ${tokens.foreground};
  --ui-muted: ${tokens.muted};
  --ui-muted-foreground: ${tokens.mutedForeground};
  --ui-border: ${tokens.border};
  --ui-ring: ${tokens.ring};
  --ui-destructive: ${tokens.destructive};
  --ui-destructive-foreground: ${tokens.destructiveForeground};
  --ui-radius: ${tokens.radius};
}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soraui-theme-${tokens.name.toLowerCase()}.css`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="css-exporter">
      <div className="css-exporter__header">
        <h3>Export Pure CSS Variables</h3>
        <div className="css-exporter__actions">
          <button type="button" onClick={handleCopy} className="export-btn">
            {copied ? '✓ Copied to Clipboard!' : '📋 Copy CSS'}
          </button>
          <button type="button" onClick={handleDownload} className="export-btn export-btn--primary">
            ⬇ Download .css
          </button>
        </div>
      </div>
      <pre className="css-exporter__code">
        <code>{cssCode}</code>
      </pre>
    </div>
  );
}