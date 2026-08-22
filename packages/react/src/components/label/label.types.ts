import type { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the associated field is required — shows visual indicator */
  required?: boolean;
  /** Whether the associated field is disabled — mutes label appearance */
  disabled?: boolean;
}
