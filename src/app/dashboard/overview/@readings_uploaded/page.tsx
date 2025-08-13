// import { delay } from '@/constants/mock-api';
import { ItemUploadBarChart } from '@/features/overview/components/readings-uploaded';

type ReadingsProps = {
  data: any; // or a specific type if known
};

export default function ItemUploads({ data }: ReadingsProps) {
  // await delay(3000);
  return <ItemUploadBarChart itemData={data}/>;
}
