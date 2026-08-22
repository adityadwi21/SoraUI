import React, { useState } from 'react';
import { ThemeScope } from '@soraui/react';
import { PreviewToolbar } from './preview-toolbar';
import { ViewportMode } from './viewport-switcher';
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
  const [theme, setTheme] = useState(defaultTheme);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--ui-radius, 0.5rem)',
        border: '1px solid var(--ui-border, #e4e4e7)',
        margin: '1.25rem 0',
        overflow: 'hidden',
        ...style,
      }}
    >
      <PreviewToolbar
        theme={theme}
        onThemeChange={setTheme}
        viewport={viewport}
        onViewportChange={setViewport}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'preview' ? (
        <div
          style={{
            padding: '2rem 1.5rem',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-background, #ffffff)',
            minHeight: '180px',
            overflowX: 'auto',
          }}
        >
          <div
            style={{
              width: getViewportWidth(),
              transition: 'width 0.2s ease',
              display: 'flex',
              justifyContent: align === 'center' ? 'center' : 'flex-start',
              alignItems: 'center',
            }}
          >
            <ThemeScope theme={theme as any}>
              <div
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: 'var(--ui-radius, 0.5rem)',
                  backgroundColor: 'var(--ui-background, #ffffff)',
                  color: 'var(--ui-foreground, #0c1a2b)',
                  border: '1px solid var(--ui-border, transparent)',
                }}
              >
                {children}
              </div>
            </ThemeScope>
          </div>
        </div>
      ) : (
        <div style={{ padding: '0 1rem' }}>
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};
