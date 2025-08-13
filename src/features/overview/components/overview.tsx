import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkItems } from './workitems';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { ItemUploadBarChart } from './readings-uploaded';
// import { WalltimeTable } from './batch-wall-time';


export default function OverViewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
          <div className='hidden items-center space-x-2 md:flex'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics' disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <div className='col-span-4'>
                <ItemUploadBarChart itemData={[]}/>
              </div>
              <Card className='col-span-4 md:col-span-3'>
                <WorkItems workItemsData={[]}/>
              </Card>
              {/* <Card className='col-span-12 md:col-span-3'>
                <WalltimeTable />
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
