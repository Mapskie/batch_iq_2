import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const BatchLUWTableSkeleton = () => {
  const rows = Array.from({ length: 8 }) // Adjust row count as needed

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>Batch Perforance LUW Comparison</CardTitle>
      </CardHeader>
      <CardContent style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="bg-muted text-xs text-muted-foreground sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">Application</th>
              <th className="px-4 py-2 text-left">PRD Total LUW</th>
              <th className="px-4 py-2 text-left">STG Total LUW</th>
              <th className="px-4 py-2 text-left">Δ Count</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, idx) => (
              <tr key={idx} className="border-t border-gray-100 text-sm">
                <td className="px-4 py-2 whitespace-nowrap">
                  <Skeleton className="h-4 w-64" />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}