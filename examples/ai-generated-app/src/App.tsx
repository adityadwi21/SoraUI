import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  ThemeProvider,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Checkbox,
  Badge,
  Statistic,
} from '@soraui/react';

export default function App() {
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (email) {
      setSubmitted(true);
    }
  };


  return (
    <ThemeProvider defaultTheme="aurora">
      <div style={{ maxWidth: '880px', margin: '2rem auto', padding: '1rem' }}>

        <header style={{ marginBottom: '2rem' }}>
          <Badge variant="default" id="ai-status-badge">AI Agent Recipe Composed</Badge>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>Cloud Infrastructure Analytics</h1>

          <p style={{ color: 'var(--ui-muted-foreground)' }}>Constructed deterministically via SoraUI MCP Server</p>
        </header>

        {/* Metric Grid Block */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <Statistic title="Total API Calls" value="1.2M" trend="up" />
            </CardContent>
          </Card>
          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <Statistic title="Avg Latency" value="14ms" trend="down" />
            </CardContent>
          </Card>
          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <Statistic title="Success Rate" value="99.98%" trend="up" />
            </CardContent>
          </Card>
        </div>

        {/* Login Form Block */}
        <div style={{ maxWidth: '420px', margin: '0 auto' }}>
          <Card>
            <CardHeader>
              <CardTitle>Sign In to Console</CardTitle>
              <CardDescription>Enter your credentials to manage deployment clusters.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} id="login-form">
                <div style={{ marginBottom: '1rem' }}>
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                  />

                </div>
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Checkbox
                    id="remember-me"
                    checked={remember}
                    onCheckedChange={(checked: boolean | 'indeterminate') => setRemember(!!checked)}
                  />

                  <Label htmlFor="remember-me">Remember device for 30 days</Label>
                </div>
                <Button id="submit-auth-btn" type="submit" variant="primary" style={{ width: '100%' }}>
                  Authenticate
                </Button>
              </form>
              {submitted && (
                <div id="auth-success-msg" style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--ui-primary-subtle, #ecfdf5)', borderRadius: '6px' }}>
                  ✅ Authenticated successfully as {email}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
