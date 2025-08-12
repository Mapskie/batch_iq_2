import { ColumnDef } from "@tanstack/react-table"

type ReportRow = {
  fileDescription: string
  fileGenerated: string
  processDate: string
  dateGenerated: string
}

export const reportColumns: ColumnDef<ReportRow>[] = [
  {
    accessorKey: "fileDescription",
    header: "File Description",
  },
  {
    accessorKey: "fileGenerated",
    header: "File Generated",
  },
  {
    accessorKey: "processDate",
    header: "Process Date",
  },
  {
    accessorKey: "dateGenerated",
    header: "Date Generated",
  },
]