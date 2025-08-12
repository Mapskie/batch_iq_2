import { delay } from '@/constants/mock-api';
import { WalltimeTable } from '@/features/overview/components/batch-wall-time';

export default async function WallTime() {
  await delay(3000);
  return <WalltimeTable />;
}
