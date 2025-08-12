"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

// Your data
const itemData = [
  { ItemType: 'Mangosteen', PrdUploaded: 36546, StgUploaded: 32625, Difference: 3921 },
  { ItemType: 'Kiwi', PrdUploaded: 14545, StgUploaded: 14545, Difference: 0 },
  { ItemType: 'Dragon Fruit', PrdUploaded: 11740, StgUploaded: 33502, Difference: -21762 },
  { ItemType: 'Pomegranate', PrdUploaded: 35804, StgUploaded: 31354, Difference: 4450 },
  { ItemType: 'Persimmon', PrdUploaded: 14563, StgUploaded: 36433, Difference: -21870 },
  { ItemType: 'Lychee', PrdUploaded: 17162, StgUploaded: 31826, Difference: -14664 },
  { ItemType: 'Blueberry', PrdUploaded: 47132, StgUploaded: 21027, Difference: 26105 },
];

const chartConfig = {
  PrdUploaded: { label: 'Prouction Uploaded', color: 'var(--chart-1)' },
  StgUploaded: { label: 'Stage Uploaded', color: 'var(--chart-2)' },
  Difference: { label: 'Difference', color: 'var(--chart-3)' },
} satisfies ChartConfig;

export function ItemUploadBarChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Meter Reading Upload Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]"> {/* Set a fixed height for better layout control */}
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            width={700} // You can customize or make responsive
            height={300} 
            data={itemData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* Horizontal & vertical grid lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} />

            {/* X & Y Axes */}
            <XAxis dataKey="ItemType" tickLine={false} axisLine={false} />
            <YAxis />

            {/* Tooltip with custom content */}
            <Tooltip content={<ChartTooltipContent />} />

            {/* Legend */}
            <Legend verticalAlign="top" height={36} />

            {/* Bars */}
            <Bar dataKey="PrdUploaded" fill="var(--color-PrdUploaded)" />
            <Bar dataKey="StgUploaded" fill="var(--color-StgUploaded)" />
            <Bar dataKey="Difference" fill="var(--color-Difference)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
