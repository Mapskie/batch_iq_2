import fs from 'fs'
import path from 'path'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

// ✅ Server-side sync logic
async function syncFiles(startDate: string, endDate: string): Promise<{ success: boolean}> {
  try {
    const sourceDir = 'C:/Users/sean.michael.beredo/Accenture/WEC - 2025 RES Hackathon - ReportsGenerated';
    const destDir = 'C:/Users/sean.michael.beredo/Downloads/sync-files';

    const start = new Date(startDate);
    const end = new Date(endDate);

    const files = fs.readdirSync(sourceDir);

    for (const file of files) {
      if (file.startsWith('.')) continue; // ❌ Skip hidden/temp/sync files

      const filePath = path.join(sourceDir, file);

      try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) continue;

        const modified = stats.mtime;

        if (modified >= start && modified <= end) {
          const destPath = path.join(destDir, file);

          // ✅ Overwrite if exists
          if (fs.existsSync(destPath)) {
            fs.unlinkSync(destPath);
          }

          fs.copyFileSync(filePath, destPath);
        }
      } catch (err:any) {
        console.warn(`Skipping file "${file}" due to error:`, err.message);
        continue;
      }
    }
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}

// ✅ Exported page component
export default function SyncFilesPage() {
  // Server Action for form submission
  async function onSubmit(formData: FormData) {
    'use server'
    const startDate = formData.get('startDate')?.toString()
    const endDate = formData.get('endDate')?.toString()

    if (!startDate || !endDate) return

    const result = await syncFiles(startDate, endDate)
    if (result) {
      redirect('/dashboard/sync-success')
    } else {
      redirect('/dashboard/sync-failed')
    }
  }

  return (
    <form action={onSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='flex flex-col space-y-2'>
        <label className='text-sm font-medium'>Start Date</label>
        <input
          type='date'
          name='startDate'
          className='border rounded px-3 py-2 text-sm'
          required
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <label className='text-sm font-medium'>End Date</label>
        <input
          type='date'
          name='endDate'
          className='border rounded px-3 py-2 text-sm'
          required
        />
      </div>
      <div className='flex items-end'>
        <Button type='submit'>Sync Files</Button>
      </div>
    </form>
  )
}
