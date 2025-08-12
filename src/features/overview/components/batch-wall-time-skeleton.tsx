import { Skeleton } from '@/components/ui/skeleton'

export const WalltimeTableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-md">
        <thead className="bg-muted text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2 text-left">Application</th>
            <th className="px-4 py-2 text-left">Prod</th>
            <th className="px-4 py-2 text-left">Stage</th>
            <th className="px-4 py-2 text-left">Δ Time</th>
            <th className="px-4 py-2 text-left">Performance</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, idx) => (
            <tr key={idx} className="border-t border-gray-100 text-sm">
              <td className="px-4 py-2">
                <Skeleton className="h-4 w-60" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-4 w-24" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}