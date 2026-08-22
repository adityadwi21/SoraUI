import { THEME_PRESETS, type ThemeTokens } from '../presets';
import { calculateContrast } from '../utils/contrast';
import { ContrastBadge } from './ContrastBadge';

interface ThemeControlsProps {
  tokens: ThemeTokens;
  onChange: (tokens: ThemeTokens) => void;
  onReset: () => void;
}

export function ThemeControls({ tokens, onChange, onReset }: ThemeControlsProps) {
  const handleColorChange = (key: keyof ThemeTokens, value: string) => {
    onChange({ ...tokens, [key]: value });
  };

  const handlePresetSelect = (presetKey: string) => {
    const preset = THEME_PRESETS[presetKey];
    if (preset) onChange({ ...preset });
  };

  // Contrast evaluations
  const primaryContrast = calculateContrast(tokens.primary, tokens.primaryForeground);
  const textContrast = calculateContrast(tokens.background, tokens.foreground);
  const mutedContrast = calculateContrast(tokens.background, tokens.mutedForeground);

  return (
    <aside className="theme-controls">
      <div className="theme-controls__header">
        <h2>Theme Customizer</h2>
        <button type="button" onClick={onReset} className="reset-btn">
          ↺ Reset
        </button>
      </div>

      {/* Preset Picker */}
      <div className="control-group">
        <label className="control-label">Preset Theme</label>
        <div className="preset-grid">
          {Object.entries(THEME_PRESETS).map(([key, p]) => (
            <button
              key={key}
              type="button"
              onClick={() => handlePresetSelect(key)}
              className={`preset-chip ${tokens.name.toLowerCase() === p.name.toLowerCase() ? 'preset-chip--active' : ''}`}
            >
              <span className="preset-chip__dot" style={{ backgroundColor: p.primary }} />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* WCAG Contrast Health Check */}
      <div className="control-group">
        <label className="control-label">WCAG 2.1 Contrast Health</label>
        <div className="contrast-stack">
          <ContrastBadge label="Primary / Foreground" result={primaryContrast} />
          <ContrastBadge label="Background / Text" result={textContrast} />
          <ContrastBadge label="Background / Muted" result={mutedContrast} />
        </div>
      </div>

      {/* Core Colors */}
      <div className="control-group">
        <label className="control-label">Core Color Tokens</label>
        <div className="color-fields">
          <div className="color-field">
            <span>Primary</span>
            <input
              type="color"
              value={tokens.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Primary Text</span>
            <input
              type="color"
              value={tokens.primaryForeground}
              onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Background</span>
            <input
              type="color"
              value={tokens.background}
              onChange={(e) => handleColorChange('background', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Foreground</span>
            <input
              type="color"
              value={tokens.foreground}
              onChange={(e) => handleColorChange('foreground', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Secondary</span>
            <input
              type="color"
              value={tokens.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Border</span>
            <input
              type="color"
              value={tokens.border}
              onChange={(e) => handleColorChange('border', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Focus Ring</span>
            <input
              type="color"
              value={tokens.ring}
              onChange={(e) => handleColorChange('ring', e.target.value)}
            />
          </div>
          <div className="color-field">
            <span>Destructive</span>
            <input
              type="color"
              value={tokens.destructive}
              onChange={(e) => handleColorChange('destructive', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Radius Slider */}
      <div className="control-group">
        <div className="radius-label">
          <label className="control-label">Corner Radius</label>
          <span className="radius-val">{tokens.radius}</span>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          step="2"
          value={parseFloat(tokens.radius) * 16}
          onChange={(e) => handleColorChange('radius', `${parseInt(e.target.value) / 16}rem`)}
          className="range-slider"
        />
      </div>
    </aside>
  );
}