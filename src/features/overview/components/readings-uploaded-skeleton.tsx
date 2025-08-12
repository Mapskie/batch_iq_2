import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ItemUploadBarChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48" /> {/* Title placeholder */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px] w-full flex flex-col justify-center items-center space-y-4">
          {/* Simulate the bar chart area with multiple bars */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full max-w-[600px] rounded" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}