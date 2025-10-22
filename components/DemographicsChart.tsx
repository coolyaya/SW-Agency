import dynamic from "next/dynamic";

import type { Creator } from "@/lib/creators";

const DemographicsChartClient = dynamic(
  () => import("./DemographicsChart.client"),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-3xl bg-muted/60" /> },
);

interface DemographicsChartProps {
  demographics: Creator["demographics"];
}

export function DemographicsChart({ demographics }: DemographicsChartProps) {
  return <DemographicsChartClient demographics={demographics} />;
}
