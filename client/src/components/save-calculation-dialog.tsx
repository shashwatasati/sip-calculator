import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface SaveCalculationDialogProps {
  calculatorType: string;
  inputs: any;
  results: any;
}

export function SaveCalculationDialog({
  calculatorType,
  inputs,
  results,
}: SaveCalculationDialogProps) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const saveMutation = useMutation({
    mutationFn: async (data: { calculatorType: string; name: string; inputs: any; results: any }) => {
      return apiRequest("POST", "/api/saved-calculations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-calculations"] });
      toast({
        title: "Calculation Saved",
        description: "Your calculation has been saved successfully",
      });
      setName("");
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save calculation",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for this calculation",
        variant: "destructive",
      });
      return;
    }

    saveMutation.mutate({
      calculatorType,
      name: name.trim(),
      inputs,
      results,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-save-calculation">
          <Save className="w-4 h-4" />
          Save Calculation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Calculation</DialogTitle>
          <DialogDescription>
            Give this calculation a name so you can find it easily later
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="calculation-name">Calculation Name</Label>
            <Input
              id="calculation-name"
              placeholder="e.g., Retirement Fund SIP"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-calculation-name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            data-testid="button-cancel-save"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            data-testid="button-confirm-save"
          >
            {saveMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
