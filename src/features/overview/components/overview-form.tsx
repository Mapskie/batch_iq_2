'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

type Props = {
  generatedReportData: string[]
  onDataLoaded: (data: { readings: any[]; workItems: any[]; wallTime: any[]; batchLuw: any[]; }) => void
  selectedFile?: string
}

export default function FileSelector({ generatedReportData, onDataLoaded, selectedFile }: Props) {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(selectedFile || '')

  async function handleLoad() {
    if (!selected) return
    setLoading(true)
    const res = await fetch(`/api/dashboard-data?file=${selected}`, { cache: 'no-store' })
    const data = await res.json()
    onDataLoaded(data)
    setLoading(false)
  }

  return (
    <form className='col-span-3' onSubmit={(e) => { e.preventDefault(); handleLoad() }}>
      <Label htmlFor='reportSelect' className='block mb-1 text-sm font-medium'>
        Select Report File
      </Label>
      <div className='flex items-center gap-2'>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger id='reportSelect' className='w-full'>
            <SelectValue placeholder='Select a file' />
          </SelectTrigger>
          <SelectContent>
            {generatedReportData.map((filename, idx) => (
              <SelectItem key={idx} value={filename}>
                {filename}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type='submit' className='px-3 py-2 text-sm' disabled={loading}>
          {loading ? 'Loading...' : 'Load'}
        </Button>
      </div>
    </form>
  )
}