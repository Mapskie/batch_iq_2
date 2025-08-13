// components/WalltimeTable.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const formatTime = (ms: number) => `${Math.round(ms / 60000)} min`

export const batchPerformanceData = [
  { procDate: "8/1/2025", application: "CBN.Batch.PaymentBatchValidation", prdWalltime: 110306, stgWalltime: 144199, diffMinutes: -33893, prdTotalLUW: 306371, stgTotalLUW: 470355, diffCount: -163984, prdAttempted: 0.4824, stgAttempted: 0.3866, diffLUWPerSec: 0.10 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.ApplyExcessCredit", prdWalltime: 497733, stgWalltime: 134667, diffMinutes: 363066, prdTotalLUW: 26517, stgTotalLUW: 221097, diffCount: -194580, prdAttempted: 3.8785, stgAttempted: 3.6855, diffLUWPerSec: 0.19 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.BillContract", prdWalltime: 61982, stgWalltime: 270435, diffMinutes: -208453, prdTotalLUW: 191374, stgTotalLUW: 467364, diffCount: -275990, prdAttempted: 1.4397, stgAttempted: 0.4206, diffLUWPerSec: 1.02 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.BillGroupContract", prdWalltime: 301590, stgWalltime: 400435, diffMinutes: -98845, prdTotalLUW: 21387, stgTotalLUW: 351167, diffCount: -329780, prdAttempted: 0.7262, stgAttempted: 0.8172, diffLUWPerSec: -0.09 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.BillMstrSubServices", prdWalltime: 315570, stgWalltime: 452132, diffMinutes: -136562, prdTotalLUW: 462496, stgTotalLUW: 165067, diffCount: 297429, prdAttempted: 4.4763, stgAttempted: 0.4041, diffLUWPerSec: 4.07 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.BillService", prdWalltime: 374442, stgWalltime: 749, diffMinutes: 373693, prdTotalLUW: 21244, stgTotalLUW: 322669, diffCount: -301425, prdAttempted: 11.9948, stgAttempted: 3.5879, diffLUWPerSec: 8.41 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.CalcAggregateReadingsNoDial", prdWalltime: 14525, stgWalltime: 441467, diffMinutes: -426942, prdTotalLUW: 224675, stgTotalLUW: 41290, diffCount: 183385, prdAttempted: 0.3278, stgAttempted: 0.4524, diffLUWPerSec: -0.12 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.CalcDailyAggregateReadings", prdWalltime: 137422, stgWalltime: 297608, diffMinutes: -160186, prdTotalLUW: 366557, stgTotalLUW: 168984, diffCount: 197573, prdAttempted: 0.2511, stgAttempted: 1.0401, diffLUWPerSec: -0.79 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.CalculateEstimate", prdWalltime: 167780, stgWalltime: 99300, diffMinutes: 68480, prdTotalLUW: 358489, stgTotalLUW: 271551, diffCount: 86938, prdAttempted: 0.0287, stgAttempted: 0.027, diffLUWPerSec: 0.00 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.CalculateEstimate", prdWalltime: 156349, stgWalltime: 151154, diffMinutes: 5195, prdTotalLUW: 190852, stgTotalLUW: 36456, diffCount: 154396, prdAttempted: 0.0287, stgAttempted: 0.027, diffLUWPerSec: 0.00 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.CreditReview", prdWalltime: 136671, stgWalltime: 473446, diffMinutes: -336775, prdTotalLUW: 55323, stgTotalLUW: 441907, diffCount: -386584, prdAttempted: 0.9669, stgAttempted: 1.3695, diffLUWPerSec: -0.40 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.DailyFinancialControls", prdWalltime: 290371, stgWalltime: 86863, diffMinutes: 203508, prdTotalLUW: 348016, stgTotalLUW: 381599, diffCount: -33583, prdAttempted: 1.1073, stgAttempted: 0.9438, diffLUWPerSec: 0.16 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.FinancialControlBalance", prdWalltime: 178837, stgWalltime: 34750, diffMinutes: 144087, prdTotalLUW: 21962, stgTotalLUW: 407106, diffCount: -385144, prdAttempted: 0.4587, stgAttempted: 0.4214, diffLUWPerSec: 0.04 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.ForceEstimate", prdWalltime: 209375, stgWalltime: 418096, diffMinutes: -208721, prdTotalLUW: 141430, stgTotalLUW: 159572, diffCount: -18142, prdAttempted: 0.2114, stgAttempted: 0.6375, diffLUWPerSec: -0.43 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.GLFileExtract", prdWalltime: 247910, stgWalltime: 258675, diffMinutes: -10765, prdTotalLUW: 86398, stgTotalLUW: 176481, diffCount: -90083, prdAttempted: 0.1042, stgAttempted: 0.1302, diffLUWPerSec: -0.03 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.GLFileStage", prdWalltime: 23404, stgWalltime: 363425, diffMinutes: -340021, prdTotalLUW: 218089, stgTotalLUW: 47930, diffCount: 170159, prdAttempted: 1.2722, stgAttempted: 1.7016, diffLUWPerSec: -0.43 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.PayAgmtRvw", prdWalltime: 436245, stgWalltime: 38057, diffMinutes: 398188, prdTotalLUW: 242183, stgTotalLUW: 166297, diffCount: 75886, prdAttempted: 0.8223, stgAttempted: 1.1255, diffLUWPerSec: -0.30 },
  { procDate: "8/1/2025", application: "CBN.Batch.Worker.PaymentPosting", prdWalltime: 384026, stgWalltime: 413837, diffMinutes: -29811, prdTotalLUW: 96638, stgTotalLUW: 489010, diffCount: -392372, prdAttempted: 4.6631, stgAttempted: 3.626, diffLUWPerSec: 1.04 }];

type WallTime = {
  Application: string
  PRDWallTime: number
  STGWallTime: number
  Difference: number
}

type Props = {
  data: WallTime[];
};


export const WalltimeTable = ({ data = [] }: Props) => {
  return (
    <Card className="w-full max-w-full">
        <CardHeader>
            <CardTitle>Batch Performance Wall Time Comparison</CardTitle>
        </CardHeader>
        <CardContent style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
            <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-muted text-xs text-muted-foreground sticky top-0">
                <tr>
                <th className="px-4 py-2 text-left">Application</th>
                <th className="px-4 py-2 text-left">Prod</th>
                <th className="px-4 py-2 text-left">Stage</th>
                <th className="px-4 py-2 text-left">Time {"(min)"}</th>
                <th className="px-4 py-2 text-left">Performance</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => {
                //const isImproved = item.Difference < 0
                const isImproved = item.STGWallTime < item.PRDWallTime
                return (
                    <tr key={idx} className="border-t border-gray-100 text-sm">
                    <td className="px-4 py-2 whitespace-nowrap">{item.Application}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.PRDWallTime}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.STGWallTime}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                        <Badge className={isImproved ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                        {isImproved ? <ArrowDown className="h-3 w-3 mr-1 inline" /> : <ArrowUp className="h-3 w-3 mr-1 inline" />}
                        {Math.abs(Math.round(item.Difference))}
                        </Badge>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                        <span className={isImproved ? "text-green-600" :  "text-red-600"}>
                        {isImproved ? "Faster in STG" : "Slower in STG"}
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