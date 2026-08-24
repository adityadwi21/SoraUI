import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { renderToString } from "react-dom/server";

// Blocks
import { LoginForm } from "./auth/login-form";
import { RegisterForm } from "./auth/register-form";
import { ForgotPasswordForm } from "./auth/forgot-password-form";
import { OTPVerification } from "./auth/otp-verification";
import { DashboardShell } from "./dashboard/dashboard-shell";
import { MetricGrid } from "./dashboard/metric-grid";
import { DataTableBlock } from "./dashboard/data-table-block";
import { HeroSection } from "./marketing/hero-section";
import { FeatureGrid } from "./marketing/feature-grid";
import { PricingTable } from "./marketing/pricing-table";
import { FAQSection } from "./marketing/faq-section";
import { FooterSection } from "./marketing/footer-section";
import { MultiStepWizard } from "./forms/multi-step-wizard";
import { SettingsForm } from "./forms/settings-form";

// Templates
import { LoginPageTemplate } from "../templates/login-page-template";
import { DashboardPageTemplate } from "../templates/dashboard-page-template";
import { SaaSLandingPageTemplate } from "../templates/saas-landing-page-template";
import { SettingsPageTemplate } from "../templates/settings-page-template";

// ThemeScope
import { ThemeScope } from "../theme/theme-scope";

describe("Phase 9B — Authentication Blocks", () => {
  it("LoginForm renders, handles validation, and submits data", () => {
    const handleSubmit = vi.fn();
    const handleSocial = vi.fn();

    render(
      <LoginForm
        socialProviders={[{ id: "google", label: "Google" }]}
        onSubmit={handleSubmit}
        onSocialLogin={handleSocial}
      />,
    );

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();

    // Trigger social login
    fireEvent.click(screen.getByText("Google"));
    expect(handleSocial).toHaveBeenCalledWith("google");

    // Trigger validation error on empty submit
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Fill form and submit
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByLabelText(/Remember me/i));
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
      rememberMe: true,
    });
  });

  it("RegisterForm validates password strength and terms acceptance", () => {
    const handleSubmit = vi.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    expect(screen.getByText("Create an account")).toBeInTheDocument();

    // Fill inputs
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "Abc12345!" },
    });

    expect(screen.getByText(/Password strength: Strong/i)).toBeInTheDocument();

    // Submit without checking terms
    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();

    // Accept terms and submit
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "Abc12345!",
    });
  });

  it("ForgotPasswordForm shows input and toggles success feedback state", () => {
    const handleSubmit = vi.fn();
    const { rerender } = render(<ForgotPasswordForm onSubmit={handleSubmit} />);

    expect(screen.getByText("Reset your password")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Reset Link" }));
    expect(handleSubmit).toHaveBeenCalledWith("test@example.com");

    // Rerender with success state
    rerender(<ForgotPasswordForm success onSubmit={handleSubmit} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Check your inbox")).toBeInTheDocument();
  });

  it("OTPVerification handles PIN code entry and submit callback", () => {
    const handleVerify = vi.fn();
    const handleResend = vi.fn();

    render(
      <OTPVerification
        recipient="user@example.com"
        onVerify={handleVerify}
        onResend={handleResend}
      />,
    );

    expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();
    expect(screen.getByText("user@example.com")).toBeInTheDocument();

    // Test resend
    fireEvent.click(screen.getByRole("button", { name: "Resend" }));
    expect(handleResend).toHaveBeenCalled();
  });
});

describe("Phase 9B — Dashboard Blocks", () => {
  it("DashboardShell renders navigation items and user account details", () => {
    const handleNavigate = vi.fn();
    render(
      <DashboardShell
        brand="Acme Console"
        navigation={[
          { id: "home", label: "Overview", active: true },
          { id: "analytics", label: "Analytics", badge: "New" },
        ]}
        onNavigate={handleNavigate}
      >
        <div>Dashboard Content</div>
      </DashboardShell>,
    );

    expect(screen.getByText("Acme Console")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Analytics"));
    expect(handleNavigate).toHaveBeenCalledWith(
      expect.objectContaining({ id: "analytics" }),
    );
  });

  it("MetricGrid displays KPI values and trend indicators", () => {
    render(
      <MetricGrid
        items={[
          {
            label: "Total Revenue",
            value: "$128,430",
            trend: { value: "14.2%", direction: "up" },
            comparison: "vs last month",
          },
          {
            label: "Active Users",
            value: "14,200",
            trend: { value: "2.1%", direction: "down" },
          },
        ]}
      />,
    );

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$128,430")).toBeInTheDocument();
    expect(screen.getByText(/14.2%/)).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
  });

  it("DataTableBlock handles search and pagination clicks", () => {
    const handleSearch = vi.fn();
    const handlePageChange = vi.fn();

    render(
      <DataTableBlock
        columns={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "role", header: "Role" },
        ]}
        data={[
          { id: "1", name: "Alice", role: "Engineer" },
          { id: "2", name: "Bob", role: "Designer" },
        ]}
        totalCount={20}
        page={1}
        pageSize={2}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
      />,
    );

    expect(screen.getByText("Data Management")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();

    // Search input
    fireEvent.change(screen.getByPlaceholderText("Search records..."), {
      target: { value: "Alice" },
    });
    expect(handleSearch).toHaveBeenCalledWith("Alice");

    // Next page
    const nextBtn = screen.getByRole("link", { name: /Next/i });
    fireEvent.click(nextBtn);
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});

describe("Phase 9B — Marketing Blocks", () => {
  it("HeroSection renders title, badge, and CTA buttons", () => {
    const handleCta = vi.fn();
    render(
      <HeroSection
        title="Next-Gen UI Architecture"
        description="Craft sleek, ultra-fast interfaces with zero bloat."
        primaryCta={{ label: "Start Building", onClick: handleCta }}
      />,
    );

    expect(screen.getByText("Next-Gen UI Architecture")).toBeInTheDocument();
    expect(
      screen.getByText("Craft sleek, ultra-fast interfaces with zero bloat."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start Building" }));
    expect(handleCta).toHaveBeenCalled();
  });

  it("FeatureGrid renders multiple feature cards", () => {
    render(
      <FeatureGrid
        title="Why SoraUI?"
        features={[
          {
            id: "speed",
            title: "Ultra Fast",
            description: "Zero runtime style generation.",
          },
          {
            id: "a11y",
            title: "Accessible",
            description: "WAI-ARIA compliant keyboard navigation.",
          },
        ]}
      />,
    );

    expect(screen.getByText("Why SoraUI?")).toBeInTheDocument();
    expect(screen.getByText("Ultra Fast")).toBeInTheDocument();
    expect(screen.getByText("Accessible")).toBeInTheDocument();
  });

  it("PricingTable toggles billing intervals and selects plans", () => {
    const handleIntervalChange = vi.fn();
    const handleSelectPlan = vi.fn();

    render(
      <PricingTable
        plans={[
          {
            id: "starter",
            name: "Starter",
            price: "$0",
            features: ["1 Project", "Community Support"],
          },
          {
            id: "pro",
            name: "Pro",
            price: "$29",
            period: "mo",
            popular: true,
            features: ["Unlimited Projects", "Priority Support"],
          },
        ]}
        onBillingIntervalChange={handleIntervalChange}
        onSelectPlan={handleSelectPlan}
      />,
    );

    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
    expect(screen.getByText("Most Popular")).toBeInTheDocument();

    // Toggle billing switch
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(handleIntervalChange).toHaveBeenCalledWith("annual");

    // Click CTA
    const buttons = screen.getAllByRole("button", { name: "Get Started" });
    fireEvent.click(buttons[0]!);
    expect(handleSelectPlan).toHaveBeenCalledWith(
      expect.objectContaining({ id: "starter" }),
    );
  });

  it("FAQSection renders accordion questions and expands answers", () => {
    render(
      <FAQSection
        items={[
          {
            id: "q1",
            question: "Is SoraUI free?",
            answer: "Yes, it is MIT licensed.",
          },
          {
            id: "q2",
            question: "Does it support Next.js?",
            answer: "Yes, both App Router and Pages Router.",
          },
        ]}
      />,
    );

    expect(screen.getByText("Is SoraUI free?")).toBeInTheDocument();
    expect(screen.getByText("Does it support Next.js?")).toBeInTheDocument();
  });

  it("FooterSection renders columns, links, and newsletter subscription", () => {
    const handleNewsletter = vi.fn();
    render(
      <FooterSection
        columns={[
          {
            title: "Product",
            links: [{ label: "Components", href: "/components" }],
          },
        ]}
        newsletter={{ title: "Newsletter" }}
        onNewsletterSubmit={handleNewsletter}
      />,
    );

    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "newsletter@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(handleNewsletter).toHaveBeenCalledWith("newsletter@example.com");
  });
});

describe("Phase 9B — Forms & Settings Blocks", () => {
  it("MultiStepWizard navigates between steps and completes", () => {
    const handleComplete = vi.fn();
    render(
      <MultiStepWizard
        steps={[
          {
            id: "step1",
            title: "Account",
            component: <div>Account Step Content</div>,
          },
          {
            id: "step2",
            title: "Profile",
            component: <div>Profile Step Content</div>,
          },
        ]}
        onComplete={handleComplete}
      />,
    );

    expect(screen.getByText("Account Step Content")).toBeInTheDocument();

    // Advance to Step 2
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Profile Step Content")).toBeInTheDocument();

    // Complete wizard
    fireEvent.click(screen.getByRole("button", { name: "Complete" }));
    expect(handleComplete).toHaveBeenCalled();
  });

  it("SettingsForm allows editing profile fields and switching preferences", () => {
    const handleSave = vi.fn();
    render(<SettingsForm onSave={handleSave} />);

    expect(screen.getByText("Account Settings")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Jane Architect" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Jane Architect" }),
    );
  });
});

describe("Phase 9B — Full Page Templates", () => {
  it("LoginPageTemplate renders full auth screen", () => {
    render(<LoginPageTemplate brandName="TestCorp" />);
    expect(screen.getByText("TestCorp")).toBeInTheDocument();
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("DashboardPageTemplate renders shell, metrics, and table", () => {
    render(
      <DashboardPageTemplate
        headerTitle="Executive Overview"
        shellProps={{
          navigation: [{ id: "nav-overview", label: "Navigation Link" }],
        }}
        metricsProps={{
          items: [{ label: "Sales", value: "$50k" }],
        }}
        tableProps={{
          columns: [{ accessorKey: "id", header: "ID" }],
          data: [{ id: "101" }],
        }}
      />,
    );

    expect(screen.getByText("Executive Overview")).toBeInTheDocument();
    expect(screen.getByText("Navigation Link")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
  });

  it("SaaSLandingPageTemplate renders marketing sections", () => {
    render(
      <SaaSLandingPageTemplate
        hero={{ title: "Hero Headline", description: "Hero Subtitle" }}
        features={{
          title: "Features",
          features: [{ id: "f1", title: "Feature 1", description: "Desc" }],
        }}
        pricing={{
          plans: [{ id: "p1", name: "Free", price: "$0", features: ["Core"] }],
        }}
        faq={{
          items: [{ id: "q1", question: "Question?", answer: "Answer." }],
        }}
        footer={{
          columns: [{ title: "Links", links: [{ label: "Home", href: "/" }] }],
        }}
      />,
    );

    expect(screen.getByText("Hero Headline")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("SettingsPageTemplate renders settings page within dashboard shell", () => {
    render(
      <SettingsPageTemplate
        shellProps={{
          navigation: [{ id: "settings", label: "Settings" }],
        }}
        settingsProps={{}}
      />,
    );

    expect(screen.getByText("Account & Preferences")).toBeInTheDocument();
    expect(screen.getByText("Account Settings")).toBeInTheDocument();
  });
});

describe("Phase 9 Theming & SSR Safety", () => {
  it("renders blocks cleanly inside nested ThemeScope", () => {
    const { container } = render(
      <ThemeScope theme="midnight">
        <HeroSection title="Dark Hero" description="Testing scoped theme" />
        <ThemeScope theme="aurora">
          <PricingTable
            plans={[
              {
                id: "plan1",
                name: "Scoped Plan",
                price: "$99",
                features: ["Feature A"],
              },
            ]}
          />
        </ThemeScope>
      </ThemeScope>,
    );

    const scopes = container.querySelectorAll(".sora-theme-scope");
    expect(scopes.length).toBe(2);
    expect(scopes[0]).toHaveAttribute("data-theme", "midnight");
    expect(scopes[1]).toHaveAttribute("data-theme", "aurora");
  });

  it("renders all blocks and templates successfully to static HTML via SSR without error", () => {
    const blocksHtml = renderToString(
      <div>
        <LoginForm />
        <RegisterForm />
        <ForgotPasswordForm />
        <OTPVerification />
        <DashboardShell navigation={[{ id: "1", label: "Item" }]} />
        <MetricGrid items={[{ label: "KPI", value: 100 }]} />
        <HeroSection title="Title" description="Desc" />
        <FeatureGrid
          title="Features"
          features={[{ id: "1", title: "F1", description: "D1" }]}
        />
        <PricingTable
          plans={[{ id: "1", name: "P1", price: "$10", features: ["A"] }]}
        />
        <FAQSection items={[{ id: "1", question: "Q", answer: "A" }]} />
        <FooterSection
          columns={[{ title: "Col", links: [{ label: "L", href: "#" }] }]}
        />
        <MultiStepWizard
          steps={[{ id: "1", title: "S1", component: <div /> }]}
        />
        <SettingsForm />
        <LoginPageTemplate />
      </div>,
    );

    expect(blocksHtml).toContain("Welcome back");
    expect(blocksHtml).toContain("Create an account");
    expect(blocksHtml).toContain("Two-Factor Authentication");
  });
});
