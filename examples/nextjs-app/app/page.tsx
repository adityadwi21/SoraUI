'use client';

import React, { useState } from 'react';
import {
  ThemeProvider,
  ThemeScope,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DataTable,
  type DataTableColumn,
} from '@soraui/react';

interface UserRecord {
  id: number;
  name: string;
  role: string;
}

const COLUMNS: DataTableColumn<UserRecord>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
];

const DATA: UserRecord[] = [
  { id: 1, name: 'Alice Developer', role: 'Engineer' },
  { id: 2, name: 'Bob Designer', role: 'UI/UX' },
];

export default function HomePage() {
  const [theme, setTheme] = useState<'sky' | 'midnight'>('sky');

  return (
    <ThemeProvider defaultTheme={theme}>
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0 }}>SoraUI Next.js Consumer</h1>
            <p style={{ color: 'var(--ui-muted-foreground)' }}>Hardened Release Candidate Verification</p>
          </div>
          <Button
            id="theme-toggle-btn"
            variant="outline"
            onClick={() => setTheme(theme === 'sky' ? 'midnight' : 'sky')}
          >
            Toggle Theme ({theme})
          </Button>
        </header>

        <Card style={{ marginBottom: '2rem' }}>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>System Health</CardTitle>
              <Badge variant="success" id="system-badge">Operational</Badge>
            </div>

            <CardDescription>Verified with zero hydration mismatch and zero monorepo leakage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input id="test-input" placeholder="Type something..." style={{ marginBottom: '1rem' }} />
            <Dialog>
              <DialogTrigger id="open-dialog-btn" asChild>
                <Button variant="primary">Open Verification Dialog</Button>
              </DialogTrigger>
              <DialogContent id="modal-content">
                <DialogHeader>
                  <DialogTitle id="modal-title">Verification Modal</DialogTitle>
                  <DialogDescription>
                    This modal verifies focus trap, portal rendering, and escape dismiss.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose id="close-dialog-btn" asChild>
                  <Button variant="outline">Dismiss</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Nested ThemeScope */}
        <ThemeScope theme="midnight">
          <Card style={{ marginBottom: '2rem', padding: '1rem' }}>
            <h3>Nested ThemeScope (Midnight)</h3>
            <DataTable columns={COLUMNS} data={DATA} />
          </Card>
        </ThemeScope>
      </main>
    </ThemeProvider>
  );
}
