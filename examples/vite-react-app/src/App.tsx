import { useState } from 'react';
import {

  ThemeProvider,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@soraui/react';

export default function App() {
  const [theme, setTheme] = useState<'aurora' | 'twilight'>('aurora');
  const [selectedValue, setSelectedValue] = useState<string>('react');

  return (
    <ThemeProvider defaultTheme={theme}>
      <div style={{ maxWidth: '720px', margin: '2rem auto', padding: '1rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 id="app-title" style={{ margin: 0 }}>SoraUI Vite SPA</h1>
            <p style={{ color: 'var(--ui-muted-foreground)' }}>Standalone Production Verification</p>
          </div>
          <Button
            id="toggle-theme-btn"
            variant="outline"
            onClick={() => setTheme(theme === 'aurora' ? 'twilight' : 'aurora')}
          >
            Toggle ({theme})
          </Button>
        </header>

        <Card style={{ marginBottom: '2rem' }}>
          <CardHeader>
            <CardTitle>Interactive Elements Verification</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <Tabs defaultValue="overview" style={{ marginBottom: '1.5rem' }}>
              <TabsList>
                <TabsTrigger value="overview" id="tab-trigger-overview">Overview</TabsTrigger>
                <TabsTrigger value="settings" id="tab-trigger-settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" id="tab-content-overview">
                <p>Welcome to the overview panel rendered by pure client SPA.</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button id="tooltip-btn" variant="secondary">Hover Me</Button>
                  </TooltipTrigger>
                  <TooltipContent id="tooltip-content">Accessible tooltip verified</TooltipContent>
                </Tooltip>
              </TabsContent>
              <TabsContent value="settings" id="tab-content-settings">
                <p>Settings panel loaded dynamically.</p>
              </TabsContent>
            </Tabs>

            {/* Select Dropdown */}
            <div>
              <label htmlFor="framework-select" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Target Framework:
              </label>
              <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger id="framework-select" style={{ width: '220px' }}>
                  <SelectValue placeholder="Select framework..." />
                </SelectTrigger>
                <SelectContent id="framework-options">
                  <SelectItem value="react">React 18</SelectItem>
                  <SelectItem value="nextjs">Next.js 14</SelectItem>
                  <SelectItem value="vite">Vite SPA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
