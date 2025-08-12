import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/components/layout/page-container';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import ReportListingPage from '@/features/reports/components/report-listing';

type PageProps = {
  searchParams: {
    date?: string;
    scenario?: string;
    s?: string;
  };
};

export const metadata = {
  title: 'Dashboard: Report Generator',
};

export default async function Page({ searchParams }: PageProps) {
  const today = new Date();
  const selectedDate = searchParams.date ? new Date(searchParams.date) : today;
  // const scenario = searchParams.scenario || '';
  
  // Server component page
  const res = await fetch('http://localhost:3000/api/read-excel', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch scenarios');
  }

  const scenarios = await res.json(); // ✅ only happens if status is OK

  // Server form handler
  async function generateReport(formData: FormData) {
    'use server';
    const date = formData.get('date')?.toString();
    const scenario = formData.get('scenario')?.toString();
    redirect(`/dashboard/reports?date=${date}&scenario=${scenario}`);
  }

  return (
    <PageContainer scrollable={false}>
      <div className='w-full flex flex-col space-y-4'>
        <Heading title='Generate Report' description='Run batch reports by date and scenario.' />
        <Separator />

        {/* FORM */}
        <form action={generateReport} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* 📅 Processing Date with Calendar Toggle */}
          <div className='flex flex-col space-y-2'>
            <label className='text-sm font-medium'>Processing Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={selectedDate} />
              </PopoverContent>
            </Popover>
            <input type='hidden' name='date' value={format(selectedDate, 'yyyy-MM-dd')} />
          </div>

          {/* 🧪 Scenario Dropdown */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="scenario" className="text-sm font-medium">
              Test Scenario
            </label>
            <div className="relative">
              <select
                id="scenario"
                name="scenario"
                // defaultValue={scenario}
                className="w-full appearance-none border border-input bg-background px-3 py-2 pr-8 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
              >
                <option value="">-- Select --</option>
                {scenarios.map((s: any) => (
                  <option key={s.scenario} value={s.scenario}>
                    {s.scenario}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                </svg>
              </div>
            </div>
          </div>


          {/* Generate Button */}
          <div className='py-7 items-end'>
            <Button type='submit'>Generate Report</Button>
          </div>
        </form>

        <Separator />

        {/* TABLE */}
        <ReportListingPage/>
      </div>
    </PageContainer>
  );
}
