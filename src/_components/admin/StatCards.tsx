import { useQuery } from "@tanstack/react-query";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/_components/admin/ui/card";
import { Badge } from "@/_components/ui/badge";
import { getDashboardOverview } from "@/_server/serverFunctions";

export function StatCards() {
  const { data } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: () => getDashboardOverview(),
  });
  const { totalRaiders, approved, rejected, pending, weeklyRaiders, weeklyApproved, weeklyRejected, weeklyPending } =
    data ?? {};

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:gap-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tracked Raiders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalRaiders ?? "-"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-muted-foreground">
              {weeklyRaiders ? `${String(weeklyRaiders)} this week` : "-"}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Approved Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {approved ?? "-"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-muted-foreground">
              {weeklyApproved ? `${String(weeklyApproved)} this week` : "-"}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Denied Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {rejected ?? "-"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-muted-foreground">
              {weeklyRejected ? `${String(weeklyRejected)} this week` : "-"}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{pending ?? "-"}</CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-muted-foreground">
              {weeklyPending ? `${String(weeklyPending)} this week` : "-"}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
