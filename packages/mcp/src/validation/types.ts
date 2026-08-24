export type Severity = "error" | "warning" | "info";

export interface Diagnostic {
  rule: string;
  severity: Severity;
  message: string;
  line?: number;
  column?: number;
  snippet?: string;
  suggestion?: string;
}

export interface ValidationReport {
  valid: boolean;
  errorsCount: number;
  warningsCount: number;
  infoCount: number;
  diagnostics: Diagnostic[];
  summary: string;
}
