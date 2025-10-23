import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface GrowthChartProps {
  data: Array<{
    year: number;
    invested: number;
    value: number;
  }>;
}

export function GrowthChart({ data }: GrowthChartProps) {
  const chartData = data.map((item) => ({
    year: `Year ${item.year}`,
    "Total Value": item.value,
    "Invested Amount": item.invested,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4" data-testid="text-growth-chart-title">
        Growth Projection
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
              if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
              if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
              return `₹${value}`;
            }}
          />
          <Tooltip
            formatter={(value: number) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="Invested Amount"
            stackId="1"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="Total Value"
            stackId="2"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2))"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
