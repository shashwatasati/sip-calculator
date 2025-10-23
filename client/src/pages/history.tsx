import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { formatCurrency } from "@/lib/calculations";
import { SavedCalculation } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const calculatorTypeLabels = {
  sip: "SIP Calculator",
  "sip-stepup": "SIP Step-up Calculator",
  lumpsum: "Lump Sum Calculator",
  swp: "SWP Calculator",
};

export default function History() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const { data: calculations, isLoading } = useQuery<SavedCalculation[]>({
    queryKey: ["/api/saved-calculations"],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      return apiRequest("PATCH", `/api/saved-calculations/${id}`, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-calculations"] });
      toast({
        title: "Calculation Renamed",
        description: "The calculation name has been updated",
      });
      setEditingId(null);
      setEditingName("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to rename calculation",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/saved-calculations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-calculations"] });
      toast({
        title: "Calculation Deleted",
        description: "The calculation has been successfully removed",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete calculation",
        variant: "destructive",
      });
    },
  });

  const startEditing = (calc: SavedCalculation) => {
    setEditingId(calc.id);
    setEditingName(calc.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEditing = (id: number) => {
    if (!editingName.trim()) {
      toast({
        title: "Name Required",
        description: "Calculation name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    updateMutation.mutate({ id, name: editingName.trim() });
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getResultSummary = (calc: SavedCalculation) => {
    const results = calc.results as any;
    const type = calc.calculatorType;

    if (type === "swp") {
      return {
        finalValue: results.remainingCorpus,
        totalAmount: results.totalWithdrawn,
        returns: results.totalReturns,
      };
    }

    return {
      finalValue: results.totalValue,
      totalAmount: results.investedAmount,
      returns: results.estimatedReturns,
    };
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-12 bg-muted rounded-md animate-pulse"></div>
          <div className="h-64 bg-muted rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calculation History</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage your saved investment calculations
          </p>
        </div>

        {!calculations || calculations.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <p className="text-muted-foreground">No saved calculations yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Calculations saved from any calculator will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculations.map((calc) => {
              const summary = getResultSummary(calc);
              return (
                <Card key={calc.id} data-testid={`card-calculation-${calc.id}`}>
                  <CardHeader className="gap-1 space-y-0 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {editingId === calc.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="text-lg font-semibold"
                              data-testid={`input-edit-name-${calc.id}`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => saveEditing(calc.id)}
                              data-testid={`button-save-edit-${calc.id}`}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={cancelEditing}
                              data-testid={`button-cancel-edit-${calc.id}`}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <CardTitle className="text-lg truncate" data-testid={`text-calculation-name-${calc.id}`}>
                              {calc.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {calculatorTypeLabels[calc.calculatorType as keyof typeof calculatorTypeLabels]}
                            </CardDescription>
                          </>
                        )}
                      </div>
                      {editingId !== calc.id && (
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEditing(calc)}
                            data-testid={`button-edit-${calc.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                data-testid={`button-delete-${calc.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Calculation</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{calc.name}"? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(calc.id)}
                                  data-testid={`button-confirm-delete-${calc.id}`}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Final Value</span>
                        <span className="text-sm font-semibold" data-testid={`text-final-value-${calc.id}`}>
                          {formatCurrency(summary.finalValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {calc.calculatorType === "swp" ? "Withdrawn" : "Invested"}
                        </span>
                        <span className="text-sm" data-testid={`text-total-amount-${calc.id}`}>
                          {formatCurrency(summary.totalAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Returns</span>
                        <span className="text-sm text-success font-semibold" data-testid={`text-returns-${calc.id}`}>
                          {formatCurrency(summary.returns)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Saved {formatDate(calc.createdAt)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
