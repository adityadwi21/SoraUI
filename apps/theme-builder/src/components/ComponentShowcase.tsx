import { useState } from 'react';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Calendar,
  DatePicker,
  Combobox,
  FileUploader,
  DataTable,
  ToastProvider,
  useToast,
} from '@soraui/react';

function ToastDemoButton() {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: 'Theme Applied!',
          description: 'Your SoraUI custom design tokens are active.',
          variant: 'default',
        })
      }
    >
      Trigger Toast Notification
    </Button>
  );
}

const mockUsers = [
  { id: 1, name: 'Alex Rivera', role: 'Staff Engineer', status: 'Active' },
  { id: 2, name: 'Sarah Chen', role: 'Product Designer', status: 'In Review' },
  { id: 3, name: 'Marcus Vance', role: 'DevOps Lead', status: 'Active' },
];

const tableColumns = [
  { header: 'ID', accessorKey: 'id' as const, sortable: true },
  { header: 'Name', accessorKey: 'name' as const, sortable: true },
  { header: 'Role', accessorKey: 'role' as const },
  {
    header: 'Status',
    accessorKey: 'status' as const,
    cell: (row: typeof mockUsers[0]) => (
      <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const comboOptions = [
  { value: 'react', label: 'React 19' },
  { value: 'next', label: 'Next.js App Router' },
  { value: 'vite', label: 'Vite SPA' },
  { value: 'astro', label: 'Astro Islands' },
];

export function ComponentShowcase() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [comboVal, setComboVal] = useState('next');

  return (
    <ToastProvider>
      <section className="showcase-container">
        {/* Buttons & Badges */}
        <Card elevated>
          <CardHeader>
            <CardTitle>Buttons & Status Badges</CardTitle>
            <CardDescription>Visual state variations with focus rings and hover transitions</CardDescription>
          </CardHeader>
          <CardContent className="showcase-row">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary" loading>Loading</Button>
            <div className="badge-row">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Critical</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls & Overlays */}
        <div className="showcase-grid-2">
          <Card>
            <CardHeader>
              <CardTitle>Form Inputs & Select</CardTitle>
              <CardDescription>Level 1 & Level 2 accessible form fields</CardDescription>
            </CardHeader>
            <CardContent className="form-stack">
              <div>
                <Label required>Project Name</Label>
                <Input placeholder="e.g. Acme Dashboard" defaultValue="SoraUI Theme Project" />
              </div>
              <div>
                <Label>Deployment Environment</Label>
                <Select defaultValue="prod">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Development</SelectItem>
                    <SelectItem value="staging">Staging Preview</SelectItem>
                    <SelectItem value="prod">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Searchable Framework (Combobox)</Label>
                <Combobox
                  options={comboOptions}
                  value={comboVal}
                  onValueChange={setComboVal}
                  placeholder="Select framework..."
                />
              </div>
            </CardContent>
            <CardFooter className="showcase-row">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="primary">Open Modal Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Theme Builder Preview</DialogTitle>
                    <DialogDescription>
                      This dialog is rendered inside an accessible portal with focus trap and backdrop blur.
                    </DialogDescription>
                  </DialogHeader>
                  <p style={{ margin: '1rem 0', fontSize: '0.875rem' }}>
                    All colors and radii adapt dynamically to your customized CSS variables!
                  </p>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="primary">Save Changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <ToastDemoButton />
            </CardFooter>
          </Card>

          {/* Calendar & DatePicker */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Calendar Pickers</CardTitle>
              <CardDescription>Level 3 zero-dependency date components</CardDescription>
            </CardHeader>
            <CardContent className="date-stack">
              <div>
                <Label>Date Picker Input</Label>
                <DatePicker value={selectedDate} onValueChange={setSelectedDate} />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Calendar value={selectedDate} onValueChange={setSelectedDate} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table & Tabs */}
        <Card elevated>
          <CardHeader>
            <CardTitle>Interactive Data Grid</CardTitle>
            <CardDescription>Sorting, search filtering, and paginated records</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ marginBottom: "1.5rem" }}>
              <Tabs defaultValue="members">
                <TabsList>
                  <TabsTrigger value="members">Team Members</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                  <div style={{ padding: "0.5rem 0" }}>
                    Manage team permissions and roles across active projects.
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div style={{ padding: "0.5rem 0" }}>
                    Monthly active users: <strong>14,250</strong> (+18.4% this week).
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DataTable
              data={mockUsers}
              columns={tableColumns}
              selectable
              pageSize={3}
              caption="Active SoraUI Team Members"
            />
          </CardContent>
        </Card>

        {/* File Uploader */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload Zone</CardTitle>
            <CardDescription>Drag and drop upload zone with client-side file queue</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader multiple maxSize={5 * 1024 * 1024} accept="image/*,.pdf" />
          </CardContent>
        </Card>
      </section>
    </ToastProvider>
  );
}