import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";
import { Card, CardHeader, CardTitle } from "@/_components/ui/card";
import { ReportDrawer } from "@/_components/ReportDrawer";
import { ReportDialog } from "@/_components/ReportDialog";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import type { getRaiderApprovedReports } from "@/_server/serverFunctions";

export function HasReports({
  embarkId,
  approvedReports,
}: {
  embarkId: string;
  approvedReports: Awaited<ReturnType<typeof getRaiderApprovedReports>>;
}) {
  return (
    <>
      <nav className="flex gap-2 justify-between items-center mb-4">
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link to="/" aria-label="Return to search" className="text-foreground/60" viewTransition>
              <ArrowLeftIcon weight="bold" aria-hidden /> RETURN
            </Link>
          }
        />
        <ReportDialog embarkId={embarkId}>
          <Button type="button" variant="ghost" className="text-foreground/60">
            FILE REPORT
          </Button>
        </ReportDialog>
      </nav>
      <section>
        <Card className="w-full relative corner-brackets animated-height py-0">
          <div className="grid gap-4 expander overflow-hidden py-4">
            <CardHeader className="relative">
              <svg
                className="absolute -translate-y-1/2 top-1/2 right-0 h-[250%] text-primary/10 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 117.34 107.22"
                stroke="none"
                aria-hidden>
                <path d="m116.89,101.98l-16.84-30.58-2.63,1.45-21.41-38.9,2.65-1.45L61.77,1.83c-1.35-2.43-4.86-2.43-6.2,0l-16.91,30.73,2.64,1.45-21.41,38.9-2.64-1.45L.44,101.98c-1.3,2.36.4,5.24,3.1,5.24h33.88v-2.75h42.5v2.75h33.86c2.7,0,4.4-2.88,3.1-5.24Zm-106.71-4.65l33.86-61.5,12.25-22.43c1.01-1.85,3.66-1.85,4.67,0l46.16,83.85c.98,1.77-.31,3.95-2.33,3.95l-92.27.08c-2.03,0-3.31-2.17-2.34-3.95Zm51.9-63.93v21.2c0,10.38-.73,19.97-.73,19.97h-5.41s-.73-9.59-.73-19.97v-21.2h6.86Zm-9.25,52.76c0-3.37,2.61-6.11,5.82-6.11s5.82,2.73,5.82,6.11-2.61,6.11-5.82,6.11-5.82-2.73-5.82-6.11Z" />
              </svg>
              <CardTitle disableGlow>
                <h1 className="uppercase text-foreground truncate">{embarkId}</h1>
                <p className="text-sm uppercase text-primary">
                  FLAGGED {approvedReports.length} TIME{approvedReports.length > 1 && "S"}
                </p>
              </CardTitle>
            </CardHeader>
          </div>
        </Card>
      </section>
      <section className="mt-4">
        <ul className="grid sm:grid-cols-2 gap-2">
          {approvedReports.map((report, index) => (
            <li
              key={report.id}
              className="report-stagger-item backdrop-blur-[2px] last:odd:sm:col-span-2"
              style={{ "--stagger": index } as CSSProperties}>
              <ReportDrawer embarkId={embarkId} report={report} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
