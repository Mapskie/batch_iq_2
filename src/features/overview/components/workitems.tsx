import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

// const workItemsData = [
//   { WorkItemType: "Meter reading not found", PRDCount: 0, STGCount: 15, Difference: 0 - 15 },
//   { WorkItemType: "Duplicate meter reading detected", PRDCount: 98, STGCount: 100, Difference: 98 - 100 },
//   { WorkItemType: "Timestamp mismatch", PRDCount: 110, STGCount: 110, Difference: 110 - 110 },
//   { WorkItemType: "Unexpected zero reading", PRDCount: 175, STGCount: 32, Difference: 175 - 32 },
//   { WorkItemType: "Meter ID mismatch", PRDCount: 130, STGCount: 129, Difference: 130 - 129 },
//   { WorkItemType: "Staging record missing", PRDCount: 125, STGCount: 20, Difference: 125 - 20 },
//   { WorkItemType: "Production count higher than staging", PRDCount: 90, STGCount: 85, Difference: 90 - 85 },
//   { WorkItemType: "Negative consumption value", PRDCount: 112, STGCount: 112, Difference: 112 - 112 },
//   { WorkItemType: "Invalid meter type", PRDCount: 100, STGCount: 102, Difference: 100 - 102 },
//   { WorkItemType: "Reading outside expected range", PRDCount: 115, STGCount: 115, Difference: 115 - 115 },
//   { WorkItemType: "Late meter submission", PRDCount: 108, STGCount: 108, Difference: 108 - 108 },
//   { WorkItemType: "Timezone discrepancy", PRDCount: 95, STGCount: 98, Difference: 95 - 98 },
//   { WorkItemType: "Meter reading not updated", PRDCount: 140, STGCount: 140, Difference: 140 - 140 },
//   { WorkItemType: "Extra reading in staging", PRDCount: 100, STGCount: 103, Difference: 100 - 103 },
//   { WorkItemType: "Missing interval data", PRDCount: 102, STGCount: 101, Difference: 102 - 101 },
//   { WorkItemType: "Reading format invalid", PRDCount: 118, STGCount: 118, Difference: 118 - 118 },
//   { WorkItemType: "Duplicate interval detected", PRDCount: 104, STGCount: 106, Difference: 104 - 106 },
//   { WorkItemType: "Unexpected meter reset", PRDCount: 132, STGCount: 132, Difference: 132 - 132 },
//   { WorkItemType: "Value rounding mismatch", PRDCount: 111, STGCount: 112, Difference: 111 - 112 },
//   { WorkItemType: "Historic reading missing", PRDCount: 57, STGCount: 184, Difference: 57 - 184 },
// ];

type WorkItem = {
  ScenarioName: string;
  WorkItemId: number;
  WorkItemType: string;
  PRDCount: number;
  STGCount: number;
  Difference: number;
};

type Props = {
  workItemsData: WorkItem[];
};

export function WorkItems({ workItemsData = [] }: Props) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Work Item Counts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Table Header */}
          <div className='flex font-semibold border-b pb-2'>
            <div className='w-1/4'>Work Item Type</div>
            <div className='w-1/4 text-center'>PRD Count</div>
            <div className='w-1/4 text-center'>STG Count</div>
            <div className='w-1/4 text-center'>Difference</div>
          </div>

          {/* Scrollable Table Rows */}
          <div className="max-h-100 overflow-y-auto">
            {[...workItemsData]
              .sort((a, b) => b.Difference - a.Difference)
              .map((item, index) => (
                <div key={index} className="flex items-center border-b py-2 text-sm">
                  <div className="w-1/4">{item.WorkItemType}</div>
                  <div className="w-1/4 text-center">{item.PRDCount}</div>
                  <div className="w-1/4 text-center">{item.STGCount}</div>
                  <div className="w-1/4 text-center">{item.Difference}</div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
