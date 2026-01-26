import { Link } from "@tanstack/react-router";
import { ReportDialog } from "@/_components/ReportDialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import { ArrowLeftIcon } from "@phosphor-icons/react";

export function NoReports({ embarkId }: { embarkId: string }) {
  return (
    <section className="grid grow place-items-center text-center">
      <Card className="corner-brackets animated-height relative w-full max-w-sm">
        <div className="expander grid gap-4">
          <CardHeader>
            <CardTitle>
              <h2>NO REPORTS</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold">{embarkId}</h1>
            <CardDescription>
              No active reports found for <span className="italic">&quot;{embarkId}&quot;</span>
            </CardDescription>
            <Separator />
            <p>CODE: 200-CLEAR</p>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-2">
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
            <ReportDialog embarkId={embarkId}>
              <Button type="button">FILE REPORT</Button>
            </ReportDialog>
          </CardFooter>
        </div>
      </Card>
    </section>
  );
}
