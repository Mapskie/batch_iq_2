import fs from 'fs/promises';
import path from 'path';
import * as XLSX from 'xlsx';

type Reading = {
  ScenarioName: string;
  ItemId: number;
  ItemType: string;
  PrdData: string;
  StgData: string;
  Variances: string;
  Flagged: boolean;
};

type WorkItem = {
  ScenarioName: string;
  WorkItemId: string;
  WorkItemType: string;
  PRDCount: number;
  STGCount: number;
  Difference: number;
};

type WallTime = {
  Application: string;
  PRDWallTime: number;
  STGWallTime: number;
  Difference: number;
};

type BatchLuw = {
  Application: string;
  PRDTotal: number;
  STGTotal: number;
  Difference: number;
};

export async function readFromExcel(filename: any): Promise<{
  readings: Reading[];
  workItems: WorkItem[];
  wallTime: WallTime[];
  batchLuw: BatchLuw[];
}> {
  const filePath = path.resolve(process.env.NEXT_PUBLIC_REPORTS_PATH, filename);

  const buffer = await fs.readFile(filePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  // Read Readings sheet
  const readingsSheet = workbook.Sheets['Meter Reading'];
  const readingsData = XLSX.utils.sheet_to_json(readingsSheet) as any[];
  const readings: Reading[] = readingsData.map((row) => ({
    ScenarioName: String(row['ScenarioName']),
    ItemId: Number(row['ItemId']),
    ItemType: String(row['ItemType']),
    PrdData: String(row['PrdData']),
    StgData: String(row['StgData']),
    Variances: String(row['Variances']),
    Flagged: Boolean(row['Flagged'])
  }));

  // Read WorkItems sheet
  const workItemsSheet = workbook.Sheets['Workitems'];
  const workItemsData = XLSX.utils.sheet_to_json(workItemsSheet) as any[];
  const workItems: WorkItem[] = workItemsData.map((row) => {
    const prdCount = Number(row['PRDCount']);
    const stgCount = Number(row['STGCount']);
    return {
      ScenarioName: String(row['ScenarioName']),
      WorkItemId: row['WorkItemId'],
      WorkItemType: String(row['WorkItemType']),
      PRDCount: prdCount,
      STGCount: stgCount,
      Difference: prdCount - stgCount
    };
  });

  // Read Batch Performance sheet
  const batchWallTimeSheet = workbook.Sheets['Batch Performance'];
  const batchWallTimeData = XLSX.utils.sheet_to_json(
    batchWallTimeSheet
  ) as any[];
  const wallTime: WallTime[] = batchWallTimeData.map((row) => {
    return {
      Application: row['Application'],
      PRDWallTime: row['PRD Walltime'],
      STGWallTime: row['STG Walltime'],
      Difference: row['Diff (Minutes)']
    };
  });

  const batchLuwSheet = workbook.Sheets['Batch Performance'];
  const batchLuwData = XLSX.utils.sheet_to_json(batchLuwSheet) as any[];
  const batchLuw: BatchLuw[] = batchLuwData.map((row) => {
    return {
      Application: row['Application'],
      PRDTotal: row['PRD Total LUW'],
      STGTotal: row['STG Total LUW'],
      Difference: row['Diff (Count)']
    };
  });

  return {
    readings: readings,
    workItems: workItems,
    wallTime: wallTime,
    batchLuw: batchLuw
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');
  const { readings, workItems, wallTime, batchLuw } =
    await readFromExcel(filename);

  return new Response(
    JSON.stringify({ readings, workItems, wallTime, batchLuw }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
