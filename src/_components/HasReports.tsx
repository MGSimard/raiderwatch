import { Link } from "@tanstack/react-router";
import { ReportDialog } from "@/_components/ReportDialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import type { getRaiderApprovedReports } from "@/_server/serverFunctions";
import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";

export function HasReports({
  embarkId,
  approvedReports,
}: {
  embarkId: string;
  approvedReports: Awaited<ReturnType<typeof getRaiderApprovedReports>>;
}) {
  return (
    <section className="grow grid place-items-center">
      <Card className="w-full max-w-sm relative corner-brackets animated-height">
        <div className="grid gap-4 expander">
          <CardHeader>
            <CardTitle>
              <h2>{embarkId}</h2>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <h2 className="text-2xl text-primary">REPORT HISTORY</h2>
            <ul>
              {approvedReports.map((report) => (
                <li key={report.id}>
                  <WarningIcon aria-hidden className="size-4" /> {report.reason}
                </li>
              ))}
            </ul>
            <CardDescription>
              No active reports found for <span className="italic">&quot;{embarkId}&quot;</span>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex gap-2 justify-center items-center">
            <Button
              variant="outline"
              size="default"
              nativeButton={false}
              render={
                <Link to="/" aria-label="Return to search">
                  <ArrowLeftIcon weight="bold" aria-hidden /> RETURN
                </Link>
              }
            />
            <ReportDialog embarkId={embarkId} />
          </CardFooter>
        </div>
      </Card>
    </section>
  );
}
