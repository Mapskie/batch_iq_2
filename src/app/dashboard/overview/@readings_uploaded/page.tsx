import { delay } from '@/constants/mock-api';
import { ItemUploadBarChart } from '@/features/overview/components/readings-uploaded';

export default async function ItemUploads() {
  await delay(3000);
  return <ItemUploadBarChart />;
}
