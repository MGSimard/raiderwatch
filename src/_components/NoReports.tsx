import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { ReportDialog } from "@/_components/ReportDialog";

export function NoReports({ embarkId }: { embarkId: string }) {
  return (
    <section className="grow grid place-items-center text-center">
      <Card className="w-full max-w-sm relative corner-brackets animated-height">
        <div className="grid gap-4 expander">
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
