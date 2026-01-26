import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "@/_lib/utils";
import { Button } from "@/_components/ui/button";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/70 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "bg-card data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-none py-4 text-xs/relaxed ring-1 duration-100 outline-none sm:max-w-sm",
          className
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={<Button variant="ghost" className="absolute top-2 right-2" size="icon-sm" />}>
            <XIcon aria-hidden />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogBody({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-body" className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)} {...props}>
      <div className="flex min-h-0 flex-1">
        <ScrollArea.Root className="min-h-0 min-w-0 flex-1">
          <ScrollArea.Viewport className="h-full overscroll-contain outline-none before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-[linear-gradient(to_bottom,var(--card),transparent)] before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-[linear-gradient(to_top,var(--card),transparent)] after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]">
            <div className="flex flex-col gap-4 px-4">{children}</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="m-1 flex w-1 justify-center transition-opacity data-hovering:delay-0 data-scrolling:duration-0">
            <ScrollArea.Thumb className="bg-border w-full rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-1 px-4 text-left", className)} {...props} />;
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 px-4 sm:flex-row sm:justify-end", className)}
      {...props}>
      {children}
      {showCloseButton && <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-sm font-medium", className)} {...props} />;
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-xs/relaxed *:[a]:underline *:[a]:underline-offset-3",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
