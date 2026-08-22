import type { ContrastResult } from '../utils/contrast';

interface ContrastBadgeProps {
  label: string;
  result: ContrastResult;
}

export function ContrastBadge({ label, result }: ContrastBadgeProps) {
  const isPass = result.passesAA;

  return (
    <div className={`contrast-badge ${isPass ? 'contrast-badge--pass' : 'contrast-badge--fail'}`}>
      <div className="contrast-badge__info">
        <span className="contrast-badge__label">{label}</span>
        <span className="contrast-badge__ratio">{result.ratioFormatted}</span>
      </div>
      <span className={`contrast-badge__tag contrast-badge__tag--${result.level.toLowerCase().replace(' ', '-')}`}>
        {result.level}
      </span>
    </div>
  );
}