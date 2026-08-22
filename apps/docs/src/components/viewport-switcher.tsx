import React from 'react';
import { Button } from '@soraui/react';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface ViewportSwitcherProps {
  value: ViewportMode;
  onChange: (mode: ViewportMode) => void;
  style?: React.CSSProperties;
}

export const ViewportSwitcher: React.FC<ViewportSwitcherProps> = ({ value, onChange, style }) => {
  return (
    <div style={{ display: 'inline-flex', gap: '0.25rem', ...style }}>
      <Button
        variant={value === 'desktop' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onChange('desktop')}
        style={{ fontSize: '0.75rem', height: '28px', padding: '0 0.5rem' }}
      >
        🖥 Desktop
      </Button>
      <Button
        variant={value === 'tablet' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onChange('tablet')}
        style={{ fontSize: '0.75rem', height: '28px', padding: '0 0.5rem' }}
      >
        📱 Tablet
      </Button>
      <Button
        variant={value === 'mobile' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onChange('mobile')}
        style={{ fontSize: '0.75rem', height: '28px', padding: '0 0.5rem' }}
      >
        📲 Mobile
      </Button>
    </div>
  );
};
