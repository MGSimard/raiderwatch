import { PlaceholderIcon } from "@phosphor-icons/react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/admin/ui/card";
import { Badge } from "@/_components/ui/badge";

export function StatCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 md:gap-6 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tracked Raiders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,250</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <PlaceholderIcon aria-hidden />
              +125
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <PlaceholderIcon className="size-4" aria-hidden />
          </div>
          <div className="text-muted-foreground">Raiders reported</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Approved Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,234</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <PlaceholderIcon aria-hidden />
              +20
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <PlaceholderIcon className="size-4" aria-hidden />
          </div>
          <div className="text-muted-foreground">Reports approved</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Denied Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">125</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <PlaceholderIcon aria-hidden />
              +125
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending down this month <PlaceholderIcon className="size-4" aria-hidden />
          </div>
          <div className="text-muted-foreground">Reports denied</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">125</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <PlaceholderIcon aria-hidden />
              +125
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <PlaceholderIcon className="size-4" aria-hidden />
          </div>
          <div className="text-muted-foreground">Reports pending</div>
        </CardFooter>
      </Card>
    </div>
  );
}
