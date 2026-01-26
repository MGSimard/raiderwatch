import { Button } from "@/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/_components/ui/drawer";
import { ScrollArea } from "@base-ui/react/scroll-area";

export function AssessmentDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>Jeff</DrawerTrigger>
      <DrawerContent className="bg-card">
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Desc</DrawerDescription>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1">
          <ScrollArea.Root className="min-h-0 min-w-0 flex-1 px-4">
            <ScrollArea.Viewport className="h-full overscroll-contain outline-none before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-[linear-gradient(to_bottom,var(--card),transparent)] before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-[linear-gradient(to_top,var(--card),transparent)] after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]">
              <div className="flex flex-col">Content</div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="m-1 flex w-1 justify-center transition-opacity data-hovering:delay-0 data-scrolling:duration-0">
              <ScrollArea.Thumb className="w-full rounded-full bg-border" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
