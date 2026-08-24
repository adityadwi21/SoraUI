import React, { useState } from "react";
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
} from "@soraui/react";
import { THEME_DOCS } from "../registry/themes";

export const PlaygroundPage: React.FC = () => {
  const [rootTheme, setRootTheme] = useState("sky");
  const [nestedTheme, setNestedTheme] = useState("midnight");
  const [sliderVal, setSliderVal] = useState(75);

  const selectStyle: React.CSSProperties = {
    height: "36px",
    padding: "0 2rem 0 0.75rem",
    fontSize: "0.875rem",
    fontFamily: "var(--docs-font-sans)",
    borderRadius: "var(--docs-radius-sm)",
    border: "1px solid var(--docs-border)",
    background: "var(--docs-bg)",
    color: "var(--docs-fg)",
    cursor: "pointer",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    minWidth: "140px",
    transition: "border-color 150ms ease",
    flex: 1,
  };

  return (
    <div className="docs-page">
      {/* Page header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--docs-fg)",
            marginBottom: "0.5rem",
          }}
        >
          Theme &amp; Component Studio
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--docs-fg-muted)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Test multi-theming, nested <code>&lt;ThemeScope&gt;</code> cascading,
          and components interactively.
        </p>
      </div>

      {/* Control bar */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",
          padding: "1rem 1.25rem",
          borderRadius: "var(--docs-radius)",
          border: "1px solid var(--docs-border)",
          background: "var(--docs-bg-subtle)",
          marginBottom: "1.75rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            flex: 1,
            minWidth: "200px",
          }}
        >
          <label
            htmlFor="root-theme"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--docs-fg-muted)",
              whiteSpace: "nowrap",
            }}
          >
            Root Theme:
          </label>
          <select
            id="root-theme"
            value={rootTheme}
            onChange={(e) => setRootTheme(e.target.value)}
            style={selectStyle}
          >
            {THEME_DOCS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.mode})
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            flex: 1,
            minWidth: "200px",
          }}
        >
          <label
            htmlFor="nested-theme"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--docs-fg-muted)",
              whiteSpace: "nowrap",
            }}
          >
            Nested Theme:
          </label>
          <select
            id="nested-theme"
            value={nestedTheme}
            onChange={(e) => setNestedTheme(e.target.value)}
            style={selectStyle}
          >
            {THEME_DOCS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.mode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Root Theme Preview */}
      <ThemeScope
        theme={rootTheme as Parameters<typeof ThemeScope>[0]["theme"]}
      >
        <div
          style={{
            padding: "2rem",
            borderRadius: "var(--docs-radius)",
            border: "1px solid var(--ui-border)",
            background: "var(--ui-background)",
            color: "var(--ui-foreground)",
            display: "grid",
            gap: "2rem",
          }}
        >
          {/* Parent surface */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700 }}>
                Parent Surface ({rootTheme})
              </h3>
              <Badge variant="default">Preset: {rootTheme}</Badge>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
              }}
            >
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <Input placeholder="Enter your text..." />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Switch defaultChecked id="pg-sw" />
                <label
                  htmlFor="pg-sw"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Turbo Mode
                </label>
              </div>
            </div>
          </div>

          {/* Nested Theme */}
          <div>
            <h4
              style={{
                margin: "0 0 0.875rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
              }}
            >
              Nested{" "}
              <code style={{ fontSize: "0.875em" }}>
                &lt;ThemeScope theme=&quot;{nestedTheme}&quot;&gt;
              </code>
            </h4>
            <ThemeScope
              theme={nestedTheme as Parameters<typeof ThemeScope>[0]["theme"]}
            >
              <Card elevated>
                <CardHeader>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CardTitle>Isolated Subtree ({nestedTheme})</CardTitle>
                    <Badge variant="secondary">Scoped Tokens</Badge>
                  </div>
                  <CardDescription>
                    This card inherits &apos;{nestedTheme}&apos; tokens while
                    the parent uses &apos;{rootTheme}&apos;.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Statistic title="CSS Overhead" value="0.0ms" />
                    <Statistic title="Bundle Cost" value="0 KB" />
                  </div>
                  <label
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Slider: {sliderVal}%
                  </label>
                  <Slider
                    value={sliderVal}
                    onValueChange={(v: number) => setSliderVal(v)}
                    max={100}
                  />
                </CardContent>
                <CardFooter
                  style={{ justifyContent: "flex-end", gap: "0.5rem" }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSliderVal(50)}
                  >
                    Reset
                  </Button>
                  <Button variant="primary" size="sm">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </ThemeScope>
          </div>

          {/* Stepper & Tabs */}
          <div>
            <h4
              style={{
                margin: "0 0 1rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
              }}
            >
              Interactive Primitives
            </h4>
            <Stepper style={{ marginBottom: "1.5rem" }}>
              <StepperItem step={1} completed>
                Discover
              </StepperItem>
              <StepperItem step={2} completed>
                Customize
              </StepperItem>
              <StepperItem step={3} active>
                Install
              </StepperItem>
              <StepperItem step={4}>Ship</StepperItem>
            </Stepper>

            <Tabs defaultValue="overview">
              <TabsList style={{ maxWidth: "300px" }}>
                <TabsTrigger value="overview" style={{ flex: 1 }}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="arch" style={{ flex: 1 }}>
                  Architecture
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" style={{ padding: "1rem 0" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--ui-muted-foreground)",
                    lineHeight: 1.7,
                  }}
                >
                  SoraUI gives you full ownership over every line of code,
                  styling token, and accessible interaction.
                </p>
              </TabsContent>
              <TabsContent value="arch" style={{ padding: "1rem 0" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--ui-muted-foreground)",
                    lineHeight: 1.7,
                  }}
                >
                  3-Layer Token hierarchy: Primitive scales → Semantic 24-key
                  contract → Component defaults.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ThemeScope>
    </div>
  );
};
