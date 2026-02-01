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
        <h1>
          {embarkId} <span className="tabular-nums">({approvedReports.length})</span>
        </h1>
      </nav>
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
