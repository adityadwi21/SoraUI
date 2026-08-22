import React, { useState } from 'react';
import {
  ThemeScope,
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Switch,
  Slider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Statistic,
  Stepper,
  StepperItem,
} from '@soraui/react';
import { THEME_DOCS } from '../registry/themes';

export const PlaygroundPage: React.FC = () => {
  const [rootTheme, setRootTheme] = useState('sky');
  const [nestedTheme, setNestedTheme] = useState('midnight');

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          SoraUI Playground
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          Test multi-theming, nested &lt;ThemeScope&gt; cascading, and components interactively in real time.
        </p>
      </div>

      {/* Control Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--ui-muted, #f4f4f5)',
          borderRadius: 'var(--ui-radius, 0.5rem)',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Global Theme:</span>
          <select
            value={rootTheme}
            onChange={(e) => setRootTheme(e.target.value)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--ui-radius, 0.375rem)',
              border: '1px solid var(--ui-border, #e4e4e7)',
              fontSize: '0.875rem',
            }}
          >
            {THEME_DOCS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.mode})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Nested Card Theme:</span>
          <select
            value={nestedTheme}
            onChange={(e) => setNestedTheme(e.target.value)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--ui-radius, 0.375rem)',
              border: '1px solid var(--ui-border, #e4e4e7)',
              fontSize: '0.875rem',
            }}
          >
            {THEME_DOCS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.mode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Root Theme Preview Area */}
      <ThemeScope theme={rootTheme as any}>
        <div
          style={{
            padding: '2rem',
            borderRadius: 'var(--ui-radius, 0.75rem)',
            border: '1px solid var(--ui-border, #e4e4e7)',
            backgroundColor: 'var(--ui-background, #ffffff)',
            color: 'var(--ui-foreground, #0c1a2b)',
            display: 'grid',
            gap: '2rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Root Container ({rootTheme})</h3>
              <Badge variant="default">Root Theme: {rootTheme}</Badge>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <Input placeholder="Enter your text..." />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch defaultChecked id="demo-sw-pl" />
                <label htmlFor="demo-sw-pl" style={{ fontSize: '0.875rem' }}>Enable Turbo Mode</label>
              </div>
            </div>
          </div>

          {/* Nested Subtree Theme Demonstration */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
              Nested &lt;ThemeScope theme=&quot;{nestedTheme}&quot;&gt;
            </h4>
            <ThemeScope theme={nestedTheme as any}>
              <Card elevated style={{ backgroundColor: 'var(--ui-card, #ffffff)', color: 'var(--ui-foreground, #0c1a2b)' }}>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardTitle>Isolated Subtree ({nestedTheme})</CardTitle>
                    <Badge variant="secondary">Scoped CSS</Badge>
                  </div>
                  <CardDescription>
                    This card automatically inherits the &apos;{nestedTheme}&apos; tokens while preserving the parent &apos;{rootTheme}&apos; page layout.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <Statistic title="Pipeline Speed" value="0.4ms" />
                    <Statistic title="Bundle Overhead" value="0 KB" />
                  </div>
                  <div style={{ marginTop: '1.25rem' }}>
                    <Slider defaultValue={75} />
                  </div>
                </CardContent>
                <CardFooter style={{ justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button variant="primary" size="sm">Apply Changes</Button>
                </CardFooter>
              </Card>
            </ThemeScope>
          </div>

          {/* Stepper & Tabs Demo */}
          <div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Interactive Primitives</h4>
            <Stepper style={{ marginBottom: '1.5rem' }}>
              <StepperItem step={1} completed>Discover</StepperItem>
              <StepperItem step={2} completed>Customize</StepperItem>
              <StepperItem step={3} active>Install</StepperItem>
              <StepperItem step={4}>Ship</StepperItem>
            </Stepper>

            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Architecture</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" style={{ padding: '1rem 0' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
                  SoraUI gives you full ownership over every line of code, styling token, and accessible interaction.
                </p>
              </TabsContent>
              <TabsContent value="tab2" style={{ padding: '1rem 0' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
                  3-Layer Token hierarchy: Layer 1 Primitive scales, Layer 2 Semantic 24-key contract, Layer 3 Component defaults.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ThemeScope>
    </div>
  );
};
