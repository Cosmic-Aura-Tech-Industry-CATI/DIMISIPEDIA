import { Printer, Download, Check } from "lucide-react";
import { type Entity } from "@/data/knowledge";

interface PrintFactsheetButtonProps {
  entity: Entity;
}

export function PrintFactsheetButton({ entity }: PrintFactsheetButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1.5 text-xs font-mono text-muted-foreground transition-colors hover:border-primary hover:text-foreground cursor-pointer"
      title="Print or save verified entity factsheet / dossier as PDF"
    >
      <Printer className="size-3.5" />
      <span>Print / PDF Factsheet</span>
    </button>
  );
}
