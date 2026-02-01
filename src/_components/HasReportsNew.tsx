import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";
import { Card, CardHeader, CardTitle } from "@/_components/ui/card";
import { ReportDrawerNew } from "@/_components/ReportDrawerNew";
import { ReportDialog } from "@/_components/ReportDialog";
import { CaretLeftIcon, CircleDashedIcon, PlusIcon, WarningDiamondIcon } from "@phosphor-icons/react";
import type { getRaiderApprovedReports } from "@/_server/serverFunctions";

export function HasReportsNew({
  embarkId,
  approvedReports,
}: {
  embarkId: string;
  approvedReports: Awaited<ReturnType<typeof getRaiderApprovedReports>>;
}) {
  return (
    <>
      <nav className="mb-4 flex items-center justify-between gap-2">
        <Link
          to="/"
          aria-label="Return to search"
          className="btn-ring grid size-8 place-items-center rounded-full bg-arc-item p-1 text-arc-muted [--pass-radius:9999px] hover:text-arc-light focus-visible:text-arc-light"
          viewTransition>
          <CaretLeftIcon className="h-full w-full" weight="bold" aria-hidden />
        </Link>
        <ReportDialog embarkId={embarkId}>
          <Button type="button" variant="ghost" className="text-foreground/60">
            FILE REPORT
          </Button>
        </ReportDialog>
      </nav>
      <section>
        <Card className="corner-brackets animated-height relative w-full py-0">
          <div className="expander grid gap-4 overflow-hidden py-4">
            <CardHeader className="relative">
              <svg
                className="pointer-events-none absolute top-1/2 right-0 h-[250%] -translate-y-1/2 text-primary/10"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 117.34 107.22"
                stroke="none"
                aria-hidden>
                <path d="m116.89,101.98l-16.84-30.58-2.63,1.45-21.41-38.9,2.65-1.45L61.77,1.83c-1.35-2.43-4.86-2.43-6.2,0l-16.91,30.73,2.64,1.45-21.41,38.9-2.64-1.45L.44,101.98c-1.3,2.36.4,5.24,3.1,5.24h33.88v-2.75h42.5v2.75h33.86c2.7,0,4.4-2.88,3.1-5.24Zm-106.71-4.65l33.86-61.5,12.25-22.43c1.01-1.85,3.66-1.85,4.67,0l46.16,83.85c.98,1.77-.31,3.95-2.33,3.95l-92.27.08c-2.03,0-3.31-2.17-2.34-3.95Zm51.9-63.93v21.2c0,10.38-.73,19.97-.73,19.97h-5.41s-.73-9.59-.73-19.97v-21.2h6.86Zm-9.25,52.76c0-3.37,2.61-6.11,5.82-6.11s5.82,2.73,5.82,6.11-2.61,6.11-5.82,6.11-5.82-2.73-5.82-6.11Z" />
              </svg>
              <CardTitle disableGlow>
                <h1 className="truncate text-foreground uppercase">{embarkId}</h1>
                <p className="text-sm text-primary uppercase">
                  FLAGGED {approvedReports.length} TIME{approvedReports.length > 1 && "S"}
                </p>
              </CardTitle>
            </CardHeader>
          </div>
        </Card>
      </section>
      <section className="mt-4">
        <div>
          <div className="flex items-center overflow-hidden rounded-t-[6px] bg-arc-light text-xl font-bold text-arc-dark uppercase">
            <div className="grid shrink-0 place-items-center bg-arc-primary px-2 py-0.5">
              <WarningDiamondIcon aria-hidden weight="bold" size={32} />
            </div>
            <h2 className="px-2 py-0.5">REPORT HISTORY</h2>
          </div>
          <ul className="grid gap-3 rounded-b-[6px] bg-arc-dark/50 p-4 backdrop-blur-sm">
            <li>
              <ReportDialog embarkId={embarkId}>
                <button
                  type="button"
                  className="btn-ring flex w-full items-center justify-between gap-4 rounded-[4px] border border-arc-border bg-arc-dark/83 p-4 text-arc-muted [--pass-radius:2px] hover:bg-arc-light hover:text-arc-dark focus-visible:bg-arc-light focus-visible:text-arc-dark">
                  <h3 className="font-bold uppercase">ADD REPORT</h3>
                  <PlusIcon className="size-8 shrink-0" aria-hidden />
                </button>
              </ReportDialog>
            </li>
            {approvedReports.length > 0 ? (
              approvedReports.map((report, index) => (
                <li key={report.id} className="report-stagger-item" style={{ "--stagger": index } as CSSProperties}>
                  <ReportDrawerNew embarkId={embarkId} report={report} />
                </li>
              ))
            ) : (
              <NoReportsItem />
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

function NoReportsItem() {
  return (
    <li className="flex w-full items-center justify-between gap-4 rounded-[4px] border border-dashed border-arc-border bg-transparent p-4 text-arc-radial select-none">
      <h2 className="uppercase">NO ACTIVE REPORTS</h2>
      <CircleDashedIcon className="size-8 shrink-0" aria-hidden />
    </li>
  );
}
