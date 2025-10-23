import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DownloadButtonsProps {
  onDownloadPDF: () => Promise<void>;
  onDownloadExcel: () => Promise<void>;
  disabled?: boolean;
}

export function DownloadButtons({ onDownloadPDF, onDownloadExcel, disabled }: DownloadButtonsProps) {
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { toast } = useToast();

  const handlePDFDownload = async () => {
    try {
      setLoadingPDF(true);
      await onDownloadPDF();
      toast({
        title: "Success",
        description: "PDF report downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PDF report",
        variant: "destructive",
      });
    } finally {
      setLoadingPDF(false);
    }
  };

  const handleExcelDownload = async () => {
    try {
      setLoadingExcel(true);
      await onDownloadExcel();
      toast({
        title: "Success",
        description: "Excel report downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download Excel report",
        variant: "destructive",
      });
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4" data-testid="text-download-title">
          Download Reports
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handlePDFDownload}
            disabled={disabled || loadingPDF}
            className="flex-1"
            data-testid="button-download-pdf"
          >
            <FileText className="w-4 h-4 mr-2" />
            {loadingPDF ? "Generating..." : "Download PDF"}
          </Button>
          <Button
            onClick={handleExcelDownload}
            disabled={disabled || loadingExcel}
            className="flex-1 bg-success border-success text-success-foreground"
            data-testid="button-download-excel"
          >
            <Download className="w-4 h-4 mr-2" />
            {loadingExcel ? "Generating..." : "Download Excel"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
