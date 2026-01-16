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
import { Textarea } from "@/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

export function ReportDialog({ embarkId }: { embarkId: string }) {
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
            <Label htmlFor="embark-id-1">Embark ID</Label>
            <Input
              id="embark-id-1"
              className="text-muted-foreground cursor-not-allowed"
              name="embark-id"
              defaultValue={embarkId}
              readOnly
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="reason-1">Reason</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Temp</SelectLabel>
                  <SelectItem value="temp1">Temp1</SelectItem>
                  <SelectItem value="temp2">Temp2</SelectItem>
                  <SelectItem value="temp3">Temp3</SelectItem>
                  <SelectItem value="temp4">Temp4</SelectItem>
                  <SelectItem value="temp5">Temp5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="youtube-url-1">Youtube URL</Label>
            <Input id="youtube-url-1" name="youtube-url" defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description-1">Description</Label>
            <Textarea
              id="description-1"
              name="description"
              defaultValue="I witnessed the following behavior and would like to report it."
            />
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
