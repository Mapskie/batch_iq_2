import * as XLSX from 'xlsx'
import path from 'path'
import fs from 'fs/promises'

type Scenario = {
  scenario: string
  threshold: number
  tableName: string
}

export async function readScenariosFromExcel(): Promise<Scenario[]> {
  const filePath = path.resolve(
    'C:/Users/sean.michael.beredo/Accenture/WEC - 2025 RES Hackathon - ReportsGenerated/My Cafe Shop Products.xlsx'
  ) // Update path to match your local file
  const time = new Date();
  console.log(time);
  // Wait briefly to allow sync
  await fs.utimes(filePath, time, time);
  await new Promise((res) => setTimeout(res, 1000));

  const buffer = await fs.readFile(filePath)
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const worksheet = workbook.Sheets['ListOfScenarios']
  const data = XLSX.utils.sheet_to_json(worksheet) as any[]

  return data.map(row => ({
    scenario: row['Scenarios'],
    threshold: row['CriteriaVarianceThreshold'],
    tableName: row['TableName'],
  }))
}

export async function GET() {
  const data = await readScenariosFromExcel();
  return Response.json(data);
}