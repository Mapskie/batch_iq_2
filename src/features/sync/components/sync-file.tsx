import fs from 'fs'
import path from 'path'
import { redirect } from 'next/navigation'

async function syncFiles(startDate: string, endDate: string) {
  const sourceDir =
    'C:/Users/sean.michael.beredo/Accenture/WEC - 2025 RES Hackathon - ReportsGenerated'
  const destDir = 'C:/Users/sean.michael.beredo/Downloads/sync-files'

  const start = new Date(startDate)
  const end = new Date(endDate)

  const files = fs.readdirSync(sourceDir)
  for (const file of files) {
    const filePath = path.join(sourceDir, file)
    const stats = fs.statSync(filePath)
    if (!stats.isFile()) continue
    const modified = stats.mtime
    if (modified >= start && modified <= end) {
      const destPath = path.join(destDir, file)
      fs.copyFileSync(filePath, destPath)
    }
  }
}

export default function SyncFilesPage() {
  // Server action inside component, marked 'use server'
  async function onSubmit(formData: FormData) {
    'use server'
    const startDate = formData.get('startDate')?.toString()
    const endDate = formData.get('endDate')?.toString()
    if (!startDate || !endDate) return

    await syncFiles(startDate, endDate)

    redirect('/sync-files') // Redirect or refresh after sync
  }

  return (
    <form action={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          className="border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Sync Files
        </button>
      </div>
    </form>
  )
}
