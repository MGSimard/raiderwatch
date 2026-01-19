import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "@/_components/admin/ui/chart";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/admin/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/_components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/_components/admin/ui/chart";

const chartConfig = {
  reports: {
    label: "Reports",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartTotalReports() {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-15");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Reports Submitted</CardTitle>
        <CardDescription>4,833 Reports</CardDescription>
        <CardAction>
          <ToggleGroup
            value={[timeRange]}
            onValueChange={(value) => {
              if (value.length > 0) {
                setTimeRange(value[0] as string);
              }
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex">
            <ToggleGroupItem value="90d">90D</ToggleGroupItem>
            <ToggleGroupItem value="30d">30D</ToggleGroupItem>
            <ToggleGroupItem value="7d">7D</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value) {
                setTimeRange(value);
              }
            }}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                90D
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30D
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7D
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value as string);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={true}
              animationDuration={0}
              content={(props) => (
                <ChartTooltipContent
                  {...props}
                  labelFormatter={(value) => {
                    return new Date(value as string).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              )}
            />
            <Bar dataKey="reports" fill="var(--color-reports)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartData = [
  { date: "2024-01-16", reports: 186 },
  { date: "2024-01-17", reports: 305 },
  { date: "2024-01-18", reports: 237 },
  { date: "2024-01-19", reports: 273 },
  { date: "2024-01-20", reports: 209 },
  { date: "2024-01-21", reports: 214 },
  { date: "2024-01-22", reports: 178 },
  { date: "2024-01-23", reports: 256 },
  { date: "2024-01-24", reports: 291 },
  { date: "2024-01-25", reports: 198 },
  { date: "2024-01-26", reports: 334 },
  { date: "2024-01-27", reports: 267 },
  { date: "2024-01-28", reports: 189 },
  { date: "2024-01-29", reports: 243 },
  { date: "2024-01-30", reports: 312 },
  { date: "2024-01-31", reports: 276 },
  { date: "2024-02-01", reports: 195 },
  { date: "2024-02-02", reports: 229 },
  { date: "2024-02-03", reports: 287 },
  { date: "2024-02-04", reports: 254 },
  { date: "2024-02-05", reports: 318 },
  { date: "2024-02-06", reports: 203 },
  { date: "2024-02-07", reports: 241 },
  { date: "2024-02-08", reports: 296 },
  { date: "2024-02-09", reports: 268 },
  { date: "2024-02-10", reports: 225 },
  { date: "2024-02-11", reports: 301 },
  { date: "2024-02-12", reports: 187 },
  { date: "2024-02-13", reports: 259 },
  { date: "2024-02-14", reports: 284 },
  { date: "2024-02-15", reports: 217 },
  { date: "2024-02-16", reports: 295 },
  { date: "2024-02-17", reports: 248 },
  { date: "2024-02-18", reports: 323 },
  { date: "2024-02-19", reports: 201 },
  { date: "2024-02-20", reports: 269 },
  { date: "2024-02-21", reports: 311 },
  { date: "2024-02-22", reports: 236 },
  { date: "2024-02-23", reports: 278 },
  { date: "2024-02-24", reports: 192 },
  { date: "2024-02-25", reports: 252 },
  { date: "2024-02-26", reports: 307 },
  { date: "2024-02-27", reports: 264 },
  { date: "2024-02-28", reports: 221 },
  { date: "2024-02-29", reports: 289 },
  { date: "2024-03-01", reports: 245 },
  { date: "2024-03-02", reports: 198 },
  { date: "2024-03-03", reports: 271 },
  { date: "2024-03-04", reports: 315 },
  { date: "2024-03-05", reports: 233 },
  { date: "2024-03-06", reports: 286 },
  { date: "2024-03-07", reports: 207 },
  { date: "2024-03-08", reports: 261 },
  { date: "2024-03-09", reports: 294 },
  { date: "2024-03-10", reports: 242 },
  { date: "2024-03-11", reports: 319 },
  { date: "2024-03-12", reports: 185 },
  { date: "2024-03-13", reports: 256 },
  { date: "2024-03-14", reports: 299 },
  { date: "2024-03-15", reports: 227 },
  { date: "2024-03-16", reports: 281 },
  { date: "2024-03-17", reports: 204 },
  { date: "2024-03-18", reports: 263 },
  { date: "2024-03-19", reports: 308 },
  { date: "2024-03-20", reports: 239 },
  { date: "2024-03-21", reports: 292 },
  { date: "2024-03-22", reports: 215 },
  { date: "2024-03-23", reports: 274 },
  { date: "2024-03-24", reports: 328 },
  { date: "2024-03-25", reports: 196 },
  { date: "2024-03-26", reports: 251 },
  { date: "2024-03-27", reports: 303 },
  { date: "2024-03-28", reports: 266 },
  { date: "2024-03-29", reports: 223 },
  { date: "2024-03-30", reports: 288 },
  { date: "2024-03-31", reports: 244 },
  { date: "2024-04-01", reports: 222 },
  { date: "2024-04-02", reports: 97 },
  { date: "2024-04-03", reports: 167 },
  { date: "2024-04-04", reports: 242 },
  { date: "2024-04-05", reports: 373 },
  { date: "2024-04-06", reports: 301 },
  { date: "2024-04-07", reports: 245 },
  { date: "2024-04-08", reports: 409 },
  { date: "2024-04-09", reports: 59 },
  { date: "2024-04-10", reports: 261 },
  { date: "2024-04-11", reports: 327 },
  { date: "2024-04-12", reports: 292 },
  { date: "2024-04-13", reports: 342 },
  { date: "2024-04-14", reports: 137 },
  { date: "2024-04-15", reports: 120 },
];
