import { describe, it, expect } from 'vitest';
import { handleValidateComposition } from '../src/index';

describe('Phase 11 — Static SoraUI Composition Analyzer', () => {
  it('detects SORA-TOKEN-001 hardcoded hex colors and returns suggestions', () => {
    const code = `
      export function CustomCard() {
        return <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>Hello</div>;
      }
    `;
    const report = handleValidateComposition({ code });
    expect(report.valid).toBe(false);
    expect(report.errorsCount).toBe(2);
    expect(report.diagnostics[0].rule).toBe('SORA-TOKEN-001');
    expect(report.diagnostics[0].suggestion).toContain('var(--ui-');
  });

  it('detects SORA-BOUNDARY-001 forbidden direct backend/fetch calls in presentation blocks', () => {
    const code = `
      export function UserListBlock() {
        useEffect(() => {
          fetch('/api/users').then(res => res.json());
        }, []);
        return <div>Users</div>;
      }
    `;
    const report = handleValidateComposition({ code });
    expect(report.warningsCount).toBe(1);
    expect(report.diagnostics[0].rule).toBe('SORA-BOUNDARY-001');
    expect(report.diagnostics[0].suggestion).toContain('UI-only');
  });

  it('detects SORA-A11Y-001 icon buttons missing aria-label', () => {
    const code = `
      export function NavHeader() {
        return <Button size="icon"><CloseIcon /></Button>;
      }
    `;
    const report = handleValidateComposition({ code });
    expect(report.valid).toBe(false);
    expect(report.diagnostics.some((d) => d.rule === 'SORA-A11Y-001')).toBe(true);
  });

  it('passes cleanly for compliant token-based accessible JSX', () => {
    const code = `
      export function CleanCard() {
        return (
          <Card className="sora-card">
            <CardHeader>
              <Button aria-label="Close settings" size="icon">✕</Button>
            </CardHeader>
            <CardContent style={{ color: 'var(--ui-foreground)' }}>
              Content
            </CardContent>
          </Card>
        );
      }
    `;
    const report = handleValidateComposition({ code });
    expect(report.valid).toBe(true);
    expect(report.errorsCount).toBe(0);
  });
});
