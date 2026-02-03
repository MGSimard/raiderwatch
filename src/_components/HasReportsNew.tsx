import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ReportDrawerNew } from "@/_components/ReportDrawerNew";
import { ReportDialogNew } from "@/_components/ReportDialogNew";
import { cn } from "@/_lib/utils";
import type { getRaiderApprovedReports } from "@/_server/serverFunctions";
import { CaretLeftIcon, CircleDashedIcon, CheckCircleIcon, PlusIcon, WarningDiamondIcon } from "@phosphor-icons/react";

export function HasReportsNew({
  embarkId,
  approvedReports,
}: {
  embarkId: string;
  approvedReports: Awaited<ReturnType<typeof getRaiderApprovedReports>>;
}) {
  return (
    <>
      <nav className="mb-4 flex flex-wrap items-center justify-between gap-8">
        <div className="flex shrink-0 items-center gap-4">
          <Link
            to="/"
            aria-label="Return to search"
            className="btn-ring grid size-8 shrink-0 place-items-center rounded-full bg-arc-item p-1 text-arc-muted [--pass-radius:9999px] hover:text-arc-light focus-visible:text-arc-light"
            viewTransition>
            <CaretLeftIcon className="h-full w-full" weight="bold" aria-hidden />
          </Link>
          <div aria-hidden className="h-6 w-px shrink-0 bg-arc-muted2" />
          <h1 className="truncate font-urbanist text-xl font-bold text-arc-light uppercase" title={embarkId}>
            {embarkId}
          </h1>
        </div>
      </nav>
      <section className="mt-4">
        <div className="overflow-hidden">
          <div className="flex items-stretch overflow-hidden rounded-t-[6px] bg-arc-light text-arc-dark">
            <div
              className={cn(
                "grid shrink-0 place-items-center px-2 py-0.5",
                approvedReports.length > 0 ? "bg-arc-primary" : "bg-arc-green"
              )}>
              {approvedReports.length > 0 ? (
                <WarningDiamondIcon aria-hidden weight="bold" size={32} />
              ) : (
                <CheckCircleIcon aria-hidden weight="bold" size={32} />
              )}
            </div>
            <h2 className="gap-2 px-2 py-0.5 text-xl font-bold uppercase">
              REPORT HISTORY{" "}
              <span className={cn("font-normal tabular-nums", approvedReports.length === 0 && "text-arc-muted")}>
                ({approvedReports.length})
              </span>
            </h2>
          </div>
          <ul className="grid gap-3 overflow-hidden rounded-b-[6px] bg-arc-dark/50 p-4 backdrop-blur-sm">
            <li>
              <ReportDialogNew embarkId={embarkId}>
                <button
                  type="button"
                  className="btn-ring flex w-full items-center justify-between gap-4 rounded-[4px] border border-arc-border bg-arc-dark/83 p-4 text-arc-muted [--pass-radius:2px] hover:bg-arc-light hover:text-arc-dark focus-visible:bg-arc-light focus-visible:text-arc-dark">
                  <h3 className="font-bold uppercase">ADD REPORT</h3>
                  <PlusIcon className="size-8 shrink-0" aria-hidden />
                </button>
              </ReportDialogNew>
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
