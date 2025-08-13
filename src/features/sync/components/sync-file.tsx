import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';

async function syncFiles(startDate: string, endDate: string) {
  const sourceDir = process.env.NEXT_PUBLIC_SYNC_DIR;
  const destDir = process.env.NEXT_PUBLIC_SYNC_SRC;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) continue;
    const modified = stats.mtime;
    if (modified >= start && modified <= end) {
      const destPath = path.join(destDir, file);
      fs.copyFileSync(filePath, destPath);
    }
  }
}

export default function SyncFilesPage() {
  // Server action inside component, marked 'use server'
  async function onSubmit(formData: FormData) {
    'use server';
    const startDate = formData.get('startDate')?.toString();
    const endDate = formData.get('endDate')?.toString();
    if (!startDate || !endDate) return;

    await syncFiles(startDate, endDate);

    redirect('/sync-files'); // Redirect or refresh after sync
  }

  return (
    <form action={onSubmit} className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      <div className='flex flex-col space-y-2'>
        <label className='text-sm font-medium'>Start Date</label>
        <input
          type='date'
          name='startDate'
          className='rounded border px-3 py-2 text-sm'
          required
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <label className='text-sm font-medium'>End Date</label>
        <input
          type='date'
          name='endDate'
          className='rounded border px-3 py-2 text-sm'
          required
        />
      </div>
      <div className='flex items-end'>
        <button
          type='submit'
          className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Sync Files
        </button>
      </div>
    </form>
  );
}
