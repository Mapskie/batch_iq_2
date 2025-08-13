import * as XLSX from 'xlsx'
import path from 'path'
import fs from 'fs/promises'

type Reading = {
  ScenarioName: string
  ItemId: number
  ItemType: string
  PrdData: string
  StgData: string
  Variances: string
  Flagged: boolean
}

export async function readFromExcel(filename:any): Promise<Reading[]> {
  const filePath = path.resolve(
    'C:/Users/sean.michael.beredo/Downloads/sync-files/' + filename
  ) // Update path to match your local file

  const buffer = await fs.readFile(filePath)
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const worksheet = workbook.Sheets['Meter Reading']
  const data = XLSX.utils.sheet_to_json(worksheet) as any[]

  return data.map(row => ({
    ScenarioName: row['ScenarioName'],
    ItemId: row['ItemId'],
    ItemType: row['ItemType'],
    PrdData: row['PrdData'],
    StgData: row['StgData'],
    Variances: row['Variances'],
    Flagged: row['Flagged'],
  }))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');
  const data = await readFromExcel(filename);
  return Response.json(data);
}