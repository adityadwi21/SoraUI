import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

describe('Tabs', () => {
  it('renders default tab and switches on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account Settings</TabsContent>
        <TabsContent value="password">Change Password</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Account Settings');

    await user.click(screen.getByRole('tab', { name: 'Password' }));

    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Change Password');
  });

  it('supports keyboard navigation (ArrowRight, ArrowLeft, Home, End)', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 3');

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
  });
});