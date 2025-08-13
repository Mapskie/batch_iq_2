import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"
import { batchPerformanceData } from "./batch-wall-time" // adjust path accordingly

type BatchLuw = {
  Application: string
  PRDTotal: number
  STGTotal: number
  Difference: number
}

type Props = {
  data: BatchLuw[];
};


export const BatchLUWTable = ({ data = [] }: Props) => {
  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>Batch Performance LUW Comparison</CardTitle>
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
            {data.map((item, idx) => {
              const isHigherInProd = item.Difference > 0
              return (
                <tr key={idx} className="border-t border-gray-100 text-sm">
                  <td className="px-4 py-2 whitespace-nowrap">{item.Application}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.PRDTotal.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.STGTotal.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Badge className={isHigherInProd ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                      {isHigherInProd ? (
                        <ArrowUp className="h-3 w-3 mr-1 inline" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1 inline" />
                      )}
                      {item.Difference.toLocaleString()}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={isHigherInProd ? "text-green-600" : "text-red-600"}>
                      {isHigherInProd ? "Higher in PRD" : "Lower in PRD"}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}