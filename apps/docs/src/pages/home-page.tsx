import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Moon,
  Sun,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Plus,
  Lock,
  RefreshCw,
  FileText,
  DollarSign,
  BarChart3,
  Target,
  Calendar,
  HelpCircle,
  BookOpen,
  Mail,
  Activity,
  Users,
  CreditCard,
  Bell,
  Shield,
  Palette,
  TrendingUp,
} from "lucide-react";
import { GitHubIcon } from "../components/brand-icons";
import {
  Button,
  Badge,
  Input,
  Label,
  Card,
  Separator,
  Avatar,
  AvatarFallback,
  Textarea,
  Switch,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Slider,
} from "@soraui/react";

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLElement>(null);

  const [docsTheme, setDocsTheme] = useState<"light" | "dark">(() => {
    try {
      return (
        (localStorage.getItem("docs-theme") as "light" | "dark") || "light"
      );
    } catch {
      return "light";
    }
  });

  const toggleTheme = () => {
    const next = docsTheme === "dark" ? "light" : "dark";
    setDocsTheme(next);
    document.documentElement.setAttribute("data-docs-theme", next);
    try {
      localStorage.setItem("docs-theme", next);
    } catch {
      /* noop */
    }
  };

  /* Parallax shimmer on mouse move */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handler = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const el = currentTarget as HTMLElement;
      const { width, height, left, top } = el.getBoundingClientRect();
      const xPct = ((clientX - left) / width - 0.5) * 30;
      const yPct = ((clientY - top) / height - 0.5) * 20;
      el.style.setProperty("--glow-x", `${50 + xPct}%`);
      el.style.setProperty("--glow-y", `${50 + yPct}%`);
    };
    hero.addEventListener("mousemove", handler);
    return () => hero.removeEventListener("mousemove", handler);
  }, []);

  // Sync docs-theme attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-docs-theme", docsTheme);
  }, []);

  // Interactive local states for widgets
  const [payoutVal, setPayoutVal] = useState(2500);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: "system",
      text: "Morning! What are we working on today? Press send to start a new conversation.",
    },
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    const userText = chatMsg;
    setChatMsg("");
    setChatLog((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: userText },
    ]);
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "system",
          text: "Great idea! You can compose this with SoraUI primitives and customize tokens seamlessly.",
        },
      ]);
    }, 600);
  };

  return (
    <div className="home-root" data-docs-theme={docsTheme}>
      {/* ─── HEADER ─── */}
      <header className="docs-header">
        <div className="docs-header-inner">
          <div className="docs-header-left">
            <button
              type="button"
              className="docs-logo"
              onClick={() => onNavigate("/")}
              aria-label="SoraUI home"
            >
              <img
                src={
                  docsTheme === "dark"
                    ? "/Logo-full-removebg.png"
                    : "/Logo-full-removebg-light.png"
                }
                alt="SoraUI"
                style={{
                  height: 48,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span className="docs-logo-chip">v0.1.0</span>
            </button>
          </div>

          {/* Center nav */}
          <nav
            className="docs-header-mid docs-top-nav"
            aria-label="Main navigation"
          >
            {(
              [
                { label: "Home", path: "/" },
                { label: "Docs", path: "/guides/introduction" },
                { label: "Components", path: "/components/button" },
                { label: "Blocks", path: "/blocks/login-form" },
                { label: "Templates", path: "/templates/dashboard-page" },
                { label: "Playground", path: "/playground" },
              ] as const
            ).map((n) => (
              <button
                key={n.label}
                type="button"
                className={`docs-nav-link${n.path === "/" ? " active" : ""}`}
                onClick={() => onNavigate(n.path)}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Right tools */}
          <div className="docs-header-right">
            <button
              type="button"
              className="docs-search-btn"
              onClick={() => onNavigate("/guides/introduction")}
              aria-label="Search"
            >
              <Search size={14} style={{ flexShrink: 0 }} />
              <span className="docs-search-btn-text">
                Search documentation...
              </span>
              <kbd className="docs-search-kbd">⌘K</kbd>
            </button>
            <button
              type="button"
              className="docs-icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {docsTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="https://github.com/adityadwi21/SoraUI"
              target="_blank"
              rel="noreferrer"
              className="docs-icon-btn"
              aria-label="GitHub"
            >
              <GitHubIcon size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="home-hero" ref={heroRef}>
        <div className="home-hero-glow" />

        <h1 className="home-hero-h1">
          The Foundation for your
          <br />
          Design System
        </h1>

        <p className="home-hero-sub">
          Beautifully crafted components for building faster, customizing
          freely, and creating interfaces that feel uniquely yours. Open source.
          Open code.
        </p>

        <div className="home-hero-actions">
          <Button
            variant="primary"
            size="lg"
            className="home-cta-primary"
            onClick={() => onNavigate("/guides/introduction")}
          >
            Start Building →
          </Button>
        </div>
      </section>

      {/* ─── SHADCN-STYLE COMPOUND SHOWCASE (POWERED BY SORAUI REACT PRIMITIVES) ─── */}
      <section className="home-showcase-bento">
        {/* ===================== COLUMN 1 ===================== */}
        <div className="home-bento-col">
          {/* Card 1: Primitives Playground */}
          <Card className="home-card">
            <div className="home-btn-group-row">
              <Button variant="primary" size="sm">
                Button <ArrowRight size={13} style={{ marginLeft: 4 }} />
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
            </div>

            <div style={{ marginTop: "0.875rem", position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--docs-fg-muted)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <Input
                placeholder="Name"
                defaultValue=""
                style={{ paddingLeft: "2rem" }}
              />
            </div>

            <div style={{ marginTop: "0.625rem" }}>
              <Input placeholder="Message" defaultValue="" />
            </div>

            <div
              className="home-badge-switch-row"
              style={{ marginTop: "0.875rem" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.375rem",
                  alignItems: "center",
                }}
              >
                <Badge variant="default">Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span className="home-dot-indicator" />
                <Switch defaultChecked />
                <Checkbox defaultChecked />
              </div>
            </div>

            <div
              className="home-btn-split-row"
              style={{ marginTop: "0.875rem" }}
            >
              <Button variant="outline" size="sm" style={{ flex: 1 }}>
                Alert Dialog
              </Button>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>
                Button Group <ChevronDown size={13} style={{ marginLeft: 4 }} />
              </Button>
            </div>
          </Card>

          {/* Card 2: Sidebar Menu Navigation Tree */}
          <Card className="home-card home-card-nav">
            <div className="home-nav-section-title">Planning</div>
            <div className="home-nav-list">
              <div className="home-nav-item">
                <FileText size={14} /> <span>Documents</span>
              </div>
              <div className="home-nav-item">
                <DollarSign size={14} /> <span>Budget</span>
              </div>
              <div className="home-nav-item">
                <BarChart3 size={14} /> <span>Reports</span>
              </div>
              <div className="home-nav-item">
                <Target size={14} /> <span>Goals</span>
              </div>
              <div className="home-nav-item">
                <Calendar size={14} /> <span>Calendar</span>
              </div>
            </div>

            <Separator className="home-nav-divider" />

            <div className="home-nav-section-title">Support</div>
            <div className="home-nav-list">
              <div className="home-nav-item">
                <HelpCircle size={14} /> <span>Help Center</span>
              </div>
              <div className="home-nav-item">
                <BookOpen size={14} /> <span>Docs</span>
              </div>
              <div className="home-nav-item">
                <Mail size={14} /> <span>Contact Us</span>
              </div>
              <div className="home-nav-item">
                <Activity size={14} /> <span>Status</span>
              </div>
              <div className="home-nav-item">
                <Users size={14} /> <span>Community</span>
              </div>
            </div>

            <Separator className="home-nav-divider" />

            <div className="home-nav-section-title">Overview</div>
            <div className="home-nav-list">
              <div className="home-nav-item active">
                <BarChart3 size={14} /> <span>Analytics</span>
              </div>
              <div className="home-nav-item">
                <Activity size={14} /> <span>Transactions</span>
              </div>
              <div className="home-nav-item">
                <TrendingUp size={14} /> <span>Investments</span>
              </div>
              <div className="home-nav-item">
                <CreditCard size={14} /> <span>Accounts</span>
              </div>
              <div className="home-nav-item">
                <DollarSign size={14} /> <span>Spending</span>
              </div>
            </div>

            <Separator className="home-nav-divider" />

            <div className="home-nav-section-title">Account</div>
            <div className="home-nav-list">
              <div className="home-nav-item">
                <Users size={14} /> <span>Profile</span>
              </div>
              <div className="home-nav-item">
                <CreditCard size={14} /> <span>Billing</span>
              </div>
              <div className="home-nav-item">
                <Bell size={14} /> <span>Notifications</span>
              </div>
              <div className="home-nav-item">
                <Shield size={14} /> <span>Security</span>
              </div>
              <div className="home-nav-item">
                <Palette size={14} /> <span>Appearance</span>
              </div>
            </div>
          </Card>

          {/* Card 3: Savings Targets */}
          <Card className="home-card">
            <div className="home-card-header-sm">
              <div className="home-card-title">Savings Targets</div>
              <div className="home-card-sub">
                Active milestones for 2026 across your portfolio. Monitor how
                close you are to each savings goal.
              </div>
            </div>

            <div className="home-savings-block">
              <div className="home-savings-label">RETIREMENT</div>
              <div className="home-savings-val">$420,000</div>
              <div className="home-savings-bar">
                <div
                  className="home-savings-bar-fill"
                  style={{ width: "65%" }}
                />
              </div>
              <div className="home-savings-meta">
                <span>65% achieved</span>
                <span className="home-savings-meta-num">$273,000</span>
              </div>
            </div>

            <div
              className="home-savings-block"
              style={{ marginTop: "1.25rem" }}
            >
              <div className="home-savings-label">REAL ESTATE</div>
              <div className="home-savings-val">$85,000</div>
              <div className="home-savings-bar">
                <div
                  className="home-savings-bar-fill"
                  style={{ width: "32%" }}
                />
              </div>
              <div className="home-savings-meta">
                <span>32% achieved</span>
                <span className="home-savings-meta-num">$27,200</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ===================== COLUMN 2 ===================== */}
        <div className="home-bento-col">
          {/* Card 4: Contribution History */}
          <Card className="home-card">
            <div className="home-card-title">Contribution History</div>
            <div className="home-card-sub">Last 5 months of activity</div>

            {/* Vertical Bar Chart */}
            <div className="home-chart-bars-5">
              {[
                { m: "Dec", h: "45%" },
                { m: "Jan", h: "70%" },
                { m: "Feb", h: "55%" },
                { m: "Mar", h: "90%" },
                { m: "Apr", h: "60%" },
              ].map((bar) => (
                <div key={bar.m} className="home-chart-bar-col">
                  <div className="home-chart-bar-track">
                    <div
                      className="home-chart-bar-thumb"
                      style={{ height: bar.h }}
                    />
                  </div>
                  <span className="home-chart-bar-label">{bar.m}</span>
                </div>
              ))}
            </div>

            <div className="home-info-grid" style={{ marginTop: "1.25rem" }}>
              <div>
                <div className="home-info-label">UPCOMING</div>
                <div className="home-info-val">May 2026</div>
                <div className="home-info-sub">Scheduled</div>
              </div>
              <div>
                <div className="home-info-label">SAVINGS PLAN</div>
                <div className="home-info-val">Accelerated</div>
                <div className="home-info-sub">Recurring</div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              View Full Report
            </Button>
          </Card>

          {/* Card 5: Claimable Balance */}
          <Card className="home-card">
            <div className="home-card-sub">Claimable Balance</div>
            <div className="home-balance-num">$1,211.29</div>
            <div className="home-status-badge">
              <span className="home-status-dot" /> Pending Setup
            </div>

            <div className="home-key-val-list" style={{ marginTop: "1.25rem" }}>
              <div className="home-key-val-row">
                <span>Net Royalties</span>
                <span className="home-key-val-num">$1,248.75</span>
              </div>
              <div className="home-key-val-row">
                <span>Processing Fee</span>
                <span className="home-key-val-num negative">-$37.46</span>
              </div>
              <div className="home-key-val-row total">
                <span>Total Ready to Claim</span>
                <span className="home-key-val-num">$1,211.29 USD</span>
              </div>
            </div>

            <div className="home-claim-note">
              Once your bank is connected, balances over $10.00 are
              automatically eligible for monthly distribution on the 15th of
              each month.
            </div>
          </Card>

          {/* Card 6: Q2 Dividend Income */}
          <Card className="home-card">
            <div className="home-card-header-flex">
              <div>
                <div className="home-card-title">Q2 Dividend Income</div>
                <div className="home-card-sub">
                  Quarterly dividend payouts across your portfolio holdings.
                </div>
              </div>
              <span className="home-close-x">✕</span>
            </div>

            <div className="home-dividend-list" style={{ marginTop: "1rem" }}>
              {[
                { name: "Vanguard", sub: "450 Shares", bars: [40, 60, 75, 90] },
                {
                  name: "S&P 500 VOO",
                  sub: "112 Shares",
                  bars: [30, 50, 45, 80],
                },
                {
                  name: "Apple AAPL",
                  sub: "85 Shares",
                  bars: [20, 35, 60, 50],
                },
                {
                  name: "Realty Income",
                  sub: "320 Shares",
                  bars: [50, 65, 70, 85],
                },
              ].map((d) => (
                <div key={d.name} className="home-dividend-row">
                  <div>
                    <div className="home-dividend-name">{d.name}</div>
                    <div className="home-dividend-sub">{d.sub}</div>
                  </div>
                  <div className="home-mini-spark">
                    {d.bars.map((h, i) => (
                      <div
                        key={i}
                        className="home-spark-bar"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ===================== COLUMN 3 ===================== */}
        <div className="home-bento-col">
          {/* Card 7: Set a New Milestone */}
          <Card className="home-card">
            <div className="home-card-title">Set a new milestone</div>
            <div className="home-card-sub">
              Define your financial target and we'll help you pace your savings.
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Label className="home-field-label">Goal Name</Label>
              <Input
                placeholder="e.g. New Car, Home Downpayment"
                defaultValue="Home Renovation"
              />
            </div>

            <div
              className="home-two-col-inputs"
              style={{ marginTop: "0.75rem" }}
            >
              <div>
                <Label className="home-field-label">Target Amount</Label>
                <Input placeholder="$15,000" defaultValue="$25,000" />
              </div>
              <div>
                <Label className="home-field-label">Target Date</Label>
                <Input placeholder="Dec 2026" defaultValue="Dec 2026" />
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Create Goal
            </Button>
            <Button
              variant="ghost"
              size="sm"
              style={{
                width: "100%",
                marginTop: "0.375rem",
                color: "var(--docs-fg-muted)",
              }}
            >
              Cancel
            </Button>
          </Card>

          {/* Card 8: Payout Threshold */}
          <Card className="home-card">
            <div className="home-card-header-flex">
              <div>
                <div className="home-card-title">Payout Threshold</div>
                <div className="home-card-sub">
                  Set the minimum balance required before a payout is triggered.
                </div>
              </div>
              <span className="home-close-x">✕</span>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Label className="home-field-label">Preferred Currency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="USD (United States Dollar)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">
                    USD (United States Dollar)
                  </SelectItem>
                  <SelectItem value="eur">EUR (Euro)</SelectItem>
                  <SelectItem value="gbp">GBP (British Pound)</SelectItem>
                  <SelectItem value="idr">IDR (Indonesian Rupiah)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <div className="home-slider-header">
                <Label className="home-field-label" style={{ margin: 0 }}>
                  Minimum Payout Amount
                </Label>
                <span className="home-slider-val">
                  ${payoutVal.toLocaleString()}.00
                </span>
              </div>
              <Slider
                defaultValue={payoutVal}
                min={50}
                max={10000}
                step={50}
                onValueChange={(v) => {
                  if (typeof v === "number") setPayoutVal(v);
                  else if (Array.isArray(v)) setPayoutVal(v[0]);
                }}
              />
              <div className="home-slider-range-labels">
                <span>$50 (MIN)</span>
                <span>$10,000 (MAX)</span>
              </div>
            </div>

            <div style={{ marginTop: "0.875rem" }}>
              <Label className="home-field-label">Notes</Label>
              <Textarea
                placeholder="Add any notes for this payout configuration..."
                rows={2}
                style={{ fontSize: "0.8125rem" }}
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Save Threshold
            </Button>
          </Card>

          {/* Card 9: Account Access */}
          <Card className="home-card">
            <div className="home-card-title">Account Access</div>
            <div className="home-card-sub">
              Update your credentials or re-authenticate.
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Label className="home-field-label">Email Address</Label>
              <Input defaultValue="artist@studio.inc" />
            </div>

            <div style={{ marginTop: "0.75rem" }}>
              <div className="home-field-header-row">
                <Label className="home-field-label" style={{ margin: 0 }}>
                  Current Password
                </Label>
                <a href="#forgot" className="home-forgot-link">
                  FORGOT?
                </a>
              </div>
              <Input type="password" defaultValue="supersecret123" />
            </div>

            <Button
              variant="outline"
              size="sm"
              style={{ width: "100%", marginTop: "1rem", gap: 6 }}
            >
              <Lock size={13} /> Update Security
            </Button>

            <div
              className="home-danger-zone-row"
              style={{ marginTop: "0.875rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="home-danger-dot" />
                <span className="home-danger-text">Danger Zone</span>
              </div>
              <ChevronRight
                size={14}
                style={{ color: "var(--docs-fg-muted)" }}
              />
            </div>
          </Card>
        </div>

        {/* ===================== COLUMN 4 ===================== */}
        <div className="home-bento-col">
          {/* Card 10: Scan to connect QR Code */}
          <Card className="home-card" style={{ textAlign: "center" }}>
            <div className="home-qr-box">
              {/* Crisp SVG QR Code */}
              <svg
                viewBox="0 0 120 120"
                width="110"
                height="110"
                fill="currentColor"
                style={{ margin: "0 auto", display: "block" }}
              >
                {/* Outer corners */}
                <rect
                  x="10"
                  y="10"
                  width="30"
                  height="30"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                <rect
                  x="18"
                  y="18"
                  width="14"
                  height="14"
                  rx="2"
                  fill="currentColor"
                />
                <rect
                  x="80"
                  y="10"
                  width="30"
                  height="30"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                <rect
                  x="88"
                  y="18"
                  width="14"
                  height="14"
                  rx="2"
                  fill="currentColor"
                />
                <rect
                  x="10"
                  y="80"
                  width="30"
                  height="30"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                <rect
                  x="18"
                  y="88"
                  width="14"
                  height="14"
                  rx="2"
                  fill="currentColor"
                />
                {/* Data dots */}
                <rect
                  x="48"
                  y="12"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="60"
                  y="12"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="48"
                  y="24"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="66"
                  y="24"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="48"
                  y="36"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="60"
                  y="36"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="12"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="24"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="36"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="48"
                  y="48"
                  width="8"
                  height="8"
                  rx="2"
                  fill="currentColor"
                />
                <rect
                  x="62"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="76"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="90"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="102"
                  y="48"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="12"
                  y="60"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="30"
                  y="60"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="48"
                  y="60"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="66"
                  y="60"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="84"
                  y="60"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="102"
                  y="60"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="48"
                  y="74"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="60"
                  y="74"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="48"
                  y="86"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="66"
                  y="86"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="80"
                  y="80"
                  width="8"
                  height="8"
                  rx="2"
                  fill="currentColor"
                />
                <rect
                  x="94"
                  y="80"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="104"
                  y="86"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="80"
                  y="94"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="92"
                  y="94"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="104"
                  y="100"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="home-card-title" style={{ marginTop: "0.875rem" }}>
              Scan to connect your mobile device
            </div>
            <div className="home-card-sub" style={{ marginTop: "0.375rem" }}>
              Open the SoraUI mobile app and scan this code to link your device.
            </div>
          </Card>

          {/* Card 11: Interactive Chat */}
          <Card className="home-card home-chat-card">
            <div className="home-card-header-flex">
              <div>
                <div className="home-card-title">New Chat</div>
                <div className="home-card-sub">How can I help you today?</div>
              </div>
              <button
                type="button"
                className="home-refresh-btn"
                onClick={() =>
                  setChatLog([
                    {
                      id: 1,
                      sender: "system",
                      text: "Morning! What are we working on today? Press send to start a new conversation.",
                    },
                  ])
                }
                title="Reset conversation"
              >
                <RefreshCw size={13} />
              </button>
            </div>

            <div className="home-chat-stream">
              {chatLog.map((msg) => (
                <div
                  key={msg.id}
                  className={`home-chat-bubble ${
                    msg.sender === "user" ? "user" : "system"
                  }`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <Avatar
                      size="sm"
                      style={{ width: 18, height: 18, fontSize: 9 }}
                    >
                      <AvatarFallback>
                        {msg.sender === "user" ? "ME" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="home-chat-greeting">
                      {msg.sender === "user" ? "You" : "SoraUI Assistant"}
                    </span>
                  </div>
                  <div className="home-chat-text">{msg.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="home-chat-form">
              <button type="button" className="home-chat-plus-btn">
                <Plus size={14} />
              </button>
              <Input
                placeholder="I'm building a chat for our app..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                style={{ flex: 1, fontSize: "0.8125rem" }}
              />
              <button
                type="submit"
                className="home-chat-send-btn"
                aria-label="Send"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </Card>

          {/* Card 12: Payments / Transfers Breadcrumbs */}
          <Card className="home-card">
            <div className="home-breadcrumb-crumb">
              <span>Home</span> <ChevronRight size={12} /> <span>...</span>{" "}
              <ChevronRight size={12} />{" "}
              <span className="active">Payments</span>
            </div>

            <div
              className="home-action-link-list"
              style={{ marginTop: "0.875rem" }}
            >
              <div className="home-action-link-row">
                <div
                  style={{
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "center",
                  }}
                >
                  <CreditCard
                    size={15}
                    style={{ color: "var(--docs-fg-muted)" }}
                  />
                  <div>
                    <div className="home-action-link-title">
                      Change transfer limit
                    </div>
                    <div className="home-action-link-sub">
                      Adjust how much you can send from your balance.
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  style={{ color: "var(--docs-fg-muted)" }}
                />
              </div>

              <div className="home-action-link-row">
                <div
                  style={{
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "center",
                  }}
                >
                  <Calendar
                    size={15}
                    style={{ color: "var(--docs-fg-muted)" }}
                  />
                  <div>
                    <div className="home-action-link-title">
                      Scheduled transfers
                    </div>
                    <div className="home-action-link-sub">
                      Set up a transfer to send at a later date.
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  style={{ color: "var(--docs-fg-muted)" }}
                />
              </div>

              <div className="home-action-link-row">
                <div
                  style={{
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "center",
                  }}
                >
                  <RefreshCw
                    size={15}
                    style={{ color: "var(--docs-fg-muted)" }}
                  />
                  <div>
                    <div className="home-action-link-title">
                      Recurring card payments
                    </div>
                    <div className="home-action-link-sub">
                      Manage your repeated card transactions.
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  style={{ color: "var(--docs-fg-muted)" }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* ===================== COLUMN 5 ===================== */}
        <div className="home-bento-col">
          {/* Card 13: Distribute Track */}
          <Card className="home-card" style={{ textAlign: "center" }}>
            <div className="home-circle-icon-btn">
              <Plus size={16} />
            </div>
            <div className="home-card-title" style={{ marginTop: "0.75rem" }}>
              Distribute Track
            </div>
            <div className="home-card-sub" style={{ marginTop: "0.25rem" }}>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </div>
            <Button
              variant="primary"
              size="sm"
              style={{ marginTop: "0.875rem" }}
            >
              Create Release
            </Button>
          </Card>

          {/* Card 14: Analytics Summary */}
          <Card className="home-card">
            <div className="home-card-header-flex">
              <div>
                <div className="home-card-title">Analytics</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  <span className="home-analytics-large">418.2K</span>
                  <span className="home-card-sub">Visitors</span>
                  <Badge variant="default" style={{ fontSize: "0.6875rem" }}>
                    +10%
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Analytics
              </Button>
            </div>

            {/* Smooth mini wave chart */}
            <div
              className="home-wave-chart-container"
              style={{ marginTop: "1rem" }}
            >
              <svg
                viewBox="0 0 200 45"
                className="home-wave-chart-svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--docs-accent)"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--docs-accent)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 35 Q 25 15, 50 25 T 100 15 T 150 30 T 200 8 L 200 45 L 0 45 Z"
                  fill="url(#wave-grad)"
                />
                <path
                  d="M 0 35 Q 25 15, 50 25 T 100 15 T 150 30 T 200 8"
                  fill="none"
                  stroke="var(--docs-accent)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Card>

          {/* Card 15: Notifications Preferences */}
          <Card className="home-card">
            <div className="home-card-title">Notifications</div>
            <div className="home-card-sub">
              Choose which email and push alerts you want to receive.
            </div>

            <div className="home-notif-pref-list" style={{ marginTop: "1rem" }}>
              <label className="home-notif-pref-item">
                <Checkbox defaultChecked />
                <div>
                  <div className="home-notif-pref-title">
                    Transaction alerts
                  </div>
                  <div className="home-notif-pref-sub">
                    Deposits, withdrawals, and transfers.
                  </div>
                </div>
              </label>

              <label className="home-notif-pref-item">
                <Checkbox defaultChecked />
                <div>
                  <div className="home-notif-pref-title">Security alerts</div>
                  <div className="home-notif-pref-sub">
                    Login attempts and account changes.
                  </div>
                </div>
              </label>

              <label className="home-notif-pref-item">
                <Checkbox />
                <div>
                  <div className="home-notif-pref-title">Goal milestones</div>
                  <div className="home-notif-pref-sub">
                    Updates at 25%, 50%, 75%, and 100%.
                  </div>
                </div>
              </label>

              <label className="home-notif-pref-item">
                <Checkbox />
                <div>
                  <div className="home-notif-pref-title">Market updates</div>
                  <div className="home-notif-pref-sub">
                    Daily portfolio summary and price alerts.
                  </div>
                </div>
              </label>
            </div>

            <Button
              variant="primary"
              size="sm"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Save Preferences
            </Button>
          </Card>

          {/* Card 16: Power Usage / System Load */}
          <Card className="home-card">
            <div className="home-card-title">Power Usage</div>
            <div className="home-card-sub">Whole Home</div>

            {/* 8-bar hourly timeline */}
            <div className="home-chart-bars-8" style={{ marginTop: "1rem" }}>
              {[
                { t: "6a", h: 40 },
                { t: "8a", h: 75 },
                { t: "10a", h: 60 },
                { t: "12p", h: 90 },
                { t: "2p", h: 70 },
                { t: "4p", h: 85 },
                { t: "6p", h: 95 },
                { t: "8p", h: 65 },
              ].map((p) => (
                <div key={p.t} className="home-chart-bar-col">
                  <div className="home-chart-bar-track">
                    <div
                      className="home-chart-bar-thumb"
                      style={{ height: `${p.h}%` }}
                    />
                  </div>
                  <span className="home-chart-bar-label">{p.t}</span>
                </div>
              ))}
            </div>

            <div className="home-info-grid" style={{ marginTop: "1rem" }}>
              <div>
                <div className="home-info-label">CURRENTLY USING</div>
                <div className="home-info-val">3.4 kW</div>
              </div>
              <div>
                <div className="home-info-label">SOLAR GEN</div>
                <div
                  className="home-info-val"
                  style={{ color: "var(--docs-accent)" }}
                >
                  +1.2 kW
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="home-footer">
        <span>
          Built by{" "}
          <a
            href="https://github.com/adityadwi21"
            target="_blank"
            rel="noreferrer"
          >
            Aditya Dwi
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/adityadwi21/SoraUI"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </span>
      </footer>
    </div>
  );
};
