import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "@/_components/admin/ui/chart";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/admin/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/_components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/_components/admin/ui/chart";
import { getReportsChartData } from "@/_server/serverFunctions";

const chartConfig = {
  reports: {
    label: "Reports",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface ReportsChartData {
  totalReports: number;
  daily: Array<{ date: string; reports: number }>;
  asOfUtc?: string;
}

const formatDateKey = (date: Date) => date.toISOString().slice(0, 10);

export function ChartTotalReports() {
  const [timeRange, setTimeRange] = useState("90d");
  const { data } = useQuery<ReportsChartData>({
    queryKey: ["reportsChartData"],
    queryFn: () => getReportsChartData(),
  });

  const totalReports = data?.totalReports;

  const filteredData = useMemo(() => {
    const daily = data?.daily;
    const asOfUtc = data?.asOfUtc;
    if (!daily) return [];

    const now = (() => {
      if (typeof asOfUtc === "string") {
        const parsed = new Date(asOfUtc);
        if (!Number.isNaN(parsed.getTime())) {
          return parsed;
        }
      }
      return new Date();
    })();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const endDate = new Date(now);
    endDate.setUTCHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - daysToSubtract);

    const reportsByDate = new Map<string, number>();
    daily.forEach((item) => {
      reportsByDate.set(item.date, item.reports);
    });

    const rangeData: Array<{ date: string; reports: number }> = [];
    const cursor = new Date(startDate);
    while (cursor <= endDate) {
      const dateKey = formatDateKey(cursor);
      rangeData.push({
        date: dateKey,
        reports: reportsByDate.get(dateKey) ?? 0,
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return rangeData;
  }, [data, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Reports Submitted</CardTitle>
        <CardDescription>{totalReports ?? "-"} Reports</CardDescription>
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
                  timeZone: "UTC",
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
                      timeZone: "UTC",
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
