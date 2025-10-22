"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Creator } from "@/lib/creators";

interface DemographicsChartClientProps {
  demographics: Creator["demographics"];
}

const FALLBACK_PRIMARY = "243 75% 59%";
const FALLBACK_MUTED_FOREGROUND = "215 16% 35%";

export default function DemographicsChartClient({
  demographics,
}: DemographicsChartClientProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [colors, setColors] = React.useState<string[]>(() => [
    `hsl(${FALLBACK_PRIMARY})`,
    `hsl(${FALLBACK_PRIMARY} / 0.85)`,
    `hsl(${FALLBACK_PRIMARY} / 0.7)`,
    `hsl(${FALLBACK_PRIMARY} / 0.55)`,
    `hsl(${FALLBACK_PRIMARY} / 0.4)`,
  ]);
  const [gridColor, setGridColor] = React.useState(`hsl(${FALLBACK_MUTED_FOREGROUND} / 0.35)`);
  const [tooltipFill, setTooltipFill] = React.useState(`hsl(${FALLBACK_PRIMARY} / 0.08)`);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || FALLBACK_PRIMARY;
    const accent = styles.getPropertyValue("--accent").trim() || primary;
    const ring = styles.getPropertyValue("--ring").trim() || primary;
    const mutedForeground =
      styles.getPropertyValue("--muted-foreground").trim() || FALLBACK_MUTED_FOREGROUND;

    setColors([
      `hsl(${primary})`,
      `hsl(${primary} / 0.85)`,
      `hsl(${accent})`,
      `hsl(${accent} / 0.75)`,
      `hsl(${ring} / 0.65)`,
    ]);
    setGridColor(`hsl(${mutedForeground} / 0.35)`);
    setTooltipFill(`hsl(${primary} / 0.08)`);
  }, [mounted, resolvedTheme]);

  if (!mounted) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonCard title="Age distribution" />
        <SkeletonCard title="Gender split" />
        <SkeletonCard title="Top countries" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-lg">Age distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={demographics.age.map(([age, value]) => ({
                age,
                value,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="age" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: tooltipFill }} />
              <Bar dataKey="value" radius={[12, 12, 0, 0]} fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-lg">Gender split</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={demographics.gender.map(([gender, value]) => ({
                  gender,
                  value,
                }))}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {demographics.gender.map((entry, index) => (
                  <Cell key={entry[0]} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, _name, entry) => [`${value}%`, entry.payload.gender]} />
            </PieChart>
          </ResponsiveContainer>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {demographics.gender.map(([label, value], index) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                    aria-hidden
                  />
                  <span className="capitalize">{label}</span>
                </div>
                <span className="font-semibold">{value}%</span>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-lg">Top countries</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={demographics.countries.map(([country, value]) => ({
                country,
                value,
              }))}
              margin={{ left: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="country"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: tooltipFill }}
                formatter={(value: number, _name, entry) => [`${value}%`, entry.payload.country]}
              />
              <Bar dataKey="value" radius={[0, 12, 12, 0]} fill={colors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function SkeletonCard({ title }: { title: string }) {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-64 items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading chart…</span>
      </CardContent>
    </Card>
  );
}
