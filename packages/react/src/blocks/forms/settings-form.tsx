import React, { useState, type FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/card/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/tabs/tabs';
import { Input } from '../../components/input/input';
import { Label } from '../../components/label/label';
import { Button } from '../../components/button/button';
import { Switch } from '../../components/switch/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/avatar/avatar';

export interface SettingsFormProps {
  initialData?: {
    name?: string;
    email?: string;
    avatar?: string;
    emailNotifications?: boolean;
    marketingEmails?: boolean;
    twoFactorAuth?: boolean;
  };
  onSave?: (data: Record<string, any>) => void;
  loading?: boolean;
  className?: string;
}

export function SettingsForm({
  initialData = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: true,
  },
  onSave,
  loading = false,
  className,
}: SettingsFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card className={className} elevated>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile, security, and notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList style={{ marginBottom: '1.5rem' }}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            {/* General Tab */}
            <TabsContent value="general">
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar style={{ width: '64px', height: '64px' }}>
                    {formData.avatar && <AvatarImage src={formData.avatar} alt={formData.name || 'User'} />}
                    <AvatarFallback style={{ fontSize: '1.25rem' }}>{(formData.name || 'U').charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" type="button">
                      Change Avatar
                    </Button>
                    <div style={{ fontSize: 'var(--sora-text-xs, 0.75rem)', color: 'var(--ui-muted-foreground, #71717a)', marginTop: '0.25rem' }}>
                      JPG, GIF or PNG. Max size of 2MB.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '0.375rem' }}>
                  <Label htmlFor="settings-name">Full Name</Label>
                  <Input
                    id="settings-name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gap: '0.375rem' }}>
                  <Label htmlFor="settings-email">Email Address</Label>
                  <Input
                    id="settings-email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--sora-text-sm, 0.875rem)' }}>Email Notifications</div>
                    <div style={{ fontSize: 'var(--sora-text-xs, 0.75rem)', color: 'var(--ui-muted-foreground, #71717a)' }}>
                      Receive emails about account activity and updates.
                    </div>
                  </div>
                  <Switch
                    id="switch-notifications"
                    checked={formData.emailNotifications ?? false}
                    onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--sora-text-sm, 0.875rem)' }}>Marketing Emails</div>
                    <div style={{ fontSize: 'var(--sora-text-xs, 0.75rem)', color: 'var(--ui-muted-foreground, #71717a)' }}>
                      Receive emails about new features and product updates.
                    </div>
                  </div>
                  <Switch
                    id="switch-marketing"
                    checked={formData.marketingEmails ?? false}
                    onCheckedChange={(checked) => setFormData({ ...formData, marketingEmails: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--sora-text-sm, 0.875rem)' }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: 'var(--sora-text-xs, 0.75rem)', color: 'var(--ui-muted-foreground, #71717a)' }}>
                      Add an extra layer of security to your account.
                    </div>
                  </div>
                  <Switch
                    id="switch-2fa"
                    checked={formData.twoFactorAuth ?? false}
                    onCheckedChange={(checked) => setFormData({ ...formData, twoFactorAuth: checked })}
                  />
                </div>

                <div style={{ display: 'grid', gap: '0.375rem' }}>
                  <Label htmlFor="settings-current-pwd">Current Password</Label>
                  <Input id="settings-current-pwd" type="password" placeholder="••••••••" />
                </div>
                <div style={{ display: 'grid', gap: '0.375rem' }}>
                  <Label htmlFor="settings-new-pwd">New Password</Label>
                  <Input id="settings-new-pwd" type="password" placeholder="••••••••" />
                </div>
              </div>
            </TabsContent>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {saved && (
                <span style={{ color: 'var(--ui-success, #10b981)', fontSize: 'var(--sora-text-sm, 0.875rem)' }}>
                  ✓ Changes saved!
                </span>
              )}
              <Button type="submit" variant="primary" loading={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
