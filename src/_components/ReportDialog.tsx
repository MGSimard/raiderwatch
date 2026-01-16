import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";

export function ReportDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button type="button">FILE REPORT</Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>FILE REPORT</DialogTitle>
          <DialogDescription>File a report for the current Embark ID.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Embark ID</Label>
            <Input id="name-1" name="name" defaultValue="username#1234" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Steam ID (Optional)</Label>
            <Input id="username-1" name="username" defaultValue="STEAM_0:1:123456789" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Reason</Label>
            <Input id="username-1" name="username" defaultValue="STEAM_0:1:123456789" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
