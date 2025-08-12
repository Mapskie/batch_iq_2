import { delay } from '@/constants/mock-api';
import { WorkItems } from '@/features/overview/components/workitems';

export default async function Sales() {
  await delay(3000);
  return <WorkItems />;
}
