'use client'

import { DataTable } from '@/components/ui/table/data-table2'
import { reportColumns } from './report-table-columns'

const emptyData: any[] = []

export default function ReportListingPage() {
  return (
    <div className='w-full'>
      <DataTable columns={reportColumns} data={emptyData} />
    </div>
  )
}