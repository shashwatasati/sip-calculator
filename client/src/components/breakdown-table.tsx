import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/calculations";

interface BreakdownRow {
  year: number;
  [key: string]: number;
}

interface BreakdownTableProps {
  data: BreakdownRow[];
  columns: Array<{
    key: string;
    label: string;
  }>;
}

export function BreakdownTable({ data, columns }: BreakdownTableProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4" data-testid="text-breakdown-title">
        Year-wise Breakdown
      </h3>
      <div className="rounded-lg border overflow-hidden">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-muted z-10">
              <TableRow>
                <TableHead className="font-semibold">Year</TableHead>
                {columns.map((col) => (
                  <TableHead key={col.key} className="text-right font-semibold">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow 
                  key={row.year}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  data-testid={`row-breakdown-${row.year}`}
                >
                  <TableCell className="font-medium">{row.year}</TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key} className="text-right" data-testid={`cell-${col.key}-${row.year}`}>
                      {formatCurrency(row[col.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
