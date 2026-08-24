import React, { useState, type ReactNode } from "react";
import { Button } from "../../components/button/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/avatar/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "../../components/dropdown/dropdown";
import type { NavigationItem } from "../types";

export interface DashboardShellProps {
  brand?: ReactNode;
  navigation: NavigationItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  breadcrumbs?: ReactNode;
  topbarActions?: ReactNode;
  children?: ReactNode;
  onNavigate?: (item: NavigationItem) => void;
  onLogout?: () => void;
  className?: string;
}

export function DashboardShell({
  brand = "SoraUI",
  navigation,
  user = { name: "Alex Johnson", email: "alex@example.com" },
  breadcrumbs,
  topbarActions,
  children,
  onNavigate,
  onLogout,
  className,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--ui-background, #ffffff)",
        color: "var(--ui-foreground, #0c1a2b)",
      }}
    >
      {/* Sidebar (Desktop & Tablet) */}
      <aside
        className="sora-dashboard-sidebar"
        style={{
          width: sidebarOpen ? "250px" : "72px",
          borderRight: "1px solid var(--ui-border, #e4e4e7)",
          backgroundColor: "var(--ui-card, #ffffff)",
          transition: "width 200ms ease",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Sidebar Brand Header */}
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            padding: "0 1rem",
            borderBottom: "1px solid var(--ui-border, #e4e4e7)",
          }}
        >
          {sidebarOpen ? (
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "var(--ui-primary, #0ea5e9)",
              }}
            >
              {brand}
            </div>
          ) : (
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "var(--ui-primary, #0ea5e9)",
              }}
            >
              {typeof brand === "string" ? brand.charAt(0) : "S"}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            style={{ display: "inline-flex" }}
          >
            {sidebarOpen ? "◀" : "▶"}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            padding: "1rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {navigation.map((item) => {
            const isActive = item.active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: sidebarOpen ? "0.625rem 0.875rem" : "0.625rem",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  borderRadius: "var(--ui-radius, 0.5rem)",
                  backgroundColor: isActive
                    ? "var(--ui-accent, #e0f2fe)"
                    : "transparent",
                  color: isActive
                    ? "var(--ui-accent-foreground, #0284c7)"
                    : "var(--ui-foreground, #0c1a2b)",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "var(--sora-text-sm, 0.875rem)",
                  width: "100%",
                  textAlign: "left",
                  transition: "background-color 150ms ease",
                }}
              >
                {item.icon && (
                  <span style={{ fontSize: "1.125rem" }}>{item.icon}</span>
                )}
                {sidebarOpen && <span style={{ flex: 1 }}>{item.label}</span>}
                {sidebarOpen && item.badge && (
                  <span
                    style={{
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "var(--sora-text-xs, 0.75rem)",
                      backgroundColor: "var(--ui-primary, #0ea5e9)",
                      color: "var(--ui-primary-foreground, #ffffff)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User profile footer */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid var(--ui-border, #e4e4e7)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Avatar>
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "var(--sora-text-sm, 0.875rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  color: "var(--ui-muted-foreground, #71717a)",
                  fontSize: "var(--sora-text-xs, 0.75rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.email}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: "64px",
            borderBottom: "1px solid var(--ui-border, #e4e4e7)",
            backgroundColor: "var(--ui-card, #ffffff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Button
              variant="ghost"
              size="icon"
              className="sora-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile navigation"
              style={{ display: "none" }}
            >
              ☰
            </Button>
            {breadcrumbs}
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {topbarActions}
            <Dropdown>
              <DropdownTrigger asChild>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    borderRadius: "9999px",
                  }}
                  aria-label="User account menu"
                >
                  <Avatar>
                    {user.avatar && (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    )}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownTrigger>
              <DropdownContent placement="bottom-end">
                <DropdownLabel>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                  <div
                    style={{
                      fontSize: "var(--sora-text-xs, 0.75rem)",
                      color: "var(--ui-muted-foreground, #71717a)",
                    }}
                  >
                    {user.email}
                  </div>
                </DropdownLabel>
                <DropdownSeparator />
                <DropdownItem>Profile Settings</DropdownItem>
                <DropdownItem>Team</DropdownItem>
                <DropdownItem>Billing</DropdownItem>
                <DropdownSeparator />
                <DropdownItem
                  onClick={onLogout}
                  style={{ color: "var(--ui-destructive, #ef4444)" }}
                >
                  Log out
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </header>

        {/* Page Main Content */}
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
