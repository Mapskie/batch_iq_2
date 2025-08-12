import { delay } from '@/constants/mock-api';
import { BatchLUWTable } from '@/features/overview/components/batch-luw';

export default async function LUWTable() {
  await delay(3000);
  return <BatchLUWTable />;
}
