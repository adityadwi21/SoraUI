import React, { useState } from 'react';
import { ThemeScope } from '@soraui/react';
import { ViewportSwitcher, ViewportMode } from './viewport-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { CodeBlock } from './code-block';

export interface ComponentPreviewProps {
  children?: React.ReactNode;
  code: string;
  defaultTheme?: string;
  align?: 'center' | 'start';
  style?: React.CSSProperties;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  code,
  defaultTheme = 'sky',
  align = 'center',
  style,
}) => {
  const [previewTheme, setPreviewTheme] = useState(defaultTheme);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  const vpWidth = viewport === 'mobile' ? '375px' : '100%';

  return (
    <div className="docs-preview-root" style={style}>
      {/* Toolbar */}
      <div className="docs-preview-toolbar">
        <div className="docs-preview-toolbar-left">
          <div className="docs-preview-tabs" role="tablist">
            {(['preview', 'code'] as const).map(t => (
              <button
                key={t} type="button" role="tab"
                aria-selected={tab === t}
                className={`docs-preview-tab${tab === t ? ' active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t === 'preview' ? 'Preview' : 'Code'}
              </button>
            ))}
          </div>
        </div>

        <div className="docs-preview-toolbar-center">
          {tab === 'preview' && <ViewportSwitcher value={viewport} onChange={setViewport} />}
        </div>

        <div className="docs-preview-toolbar-right">
          <ThemeSwitcher value={previewTheme} onChange={setPreviewTheme} />
        </div>
      </div>

      {/* Content */}
      {tab === 'preview' ? (
        <div className="docs-preview-canvas">
          <div style={{
            width: vpWidth,
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <ThemeScope theme={previewTheme as Parameters<typeof ThemeScope>[0]['theme']}>
              <div
                className="docs-preview-theme-canvas"
                style={{
                  justifyContent: align === 'center' ? 'center' : 'flex-start',
                  alignItems: align === 'center' ? 'center' : 'flex-start',
                }}
              >
                {children}
              </div>
            </ThemeScope>
          </div>
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
};
