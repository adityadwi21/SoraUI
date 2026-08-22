import type { ValidationReport, Diagnostic } from './types';
import { analyzeTokenCompliance } from './tokens';
import { analyzeBoundaryCompliance } from './boundaries';
import { analyzeAccessibility } from './accessibility';

export * from './types';

export function validateComposition(code: string): ValidationReport {
  const diagnostics: Diagnostic[] = [
    ...analyzeTokenCompliance(code),
    ...analyzeBoundaryCompliance(code),
    ...analyzeAccessibility(code),
  ];

  const errorsCount = diagnostics.filter((d) => d.severity === 'error').length;
  const warningsCount = diagnostics.filter((d) => d.severity === 'warning').length;
  const infoCount = diagnostics.filter((d) => d.severity === 'info').length;

  const valid = errorsCount === 0;

  let summary = 'Composition is valid and compliant with SoraUI standards.';
  if (!valid) {
    summary = `Found ${errorsCount} error(s) and ${warningsCount} warning(s). Please review diagnostics for suggested fixes.`;
  } else if (warningsCount > 0) {
    summary = `Composition is valid with ${warningsCount} architectural recommendation(s).`;
  }

  return {
    valid,
    errorsCount,
    warningsCount,
    infoCount,
    diagnostics,
    summary,
  };
}
