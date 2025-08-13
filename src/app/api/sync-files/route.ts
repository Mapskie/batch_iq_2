import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const { startDate, endDate } = await req.json();

  const sourceDir = '';
  const destDir = '';

  const start = new Date(startDate);
  const end = new Date(endDate);

  const copiedFiles: string[] = [];

  // Read all files in source folder
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);

    // Skip folders
    if (!stats.isFile()) continue;

    const modified = stats.mtime;

    if (modified >= start && modified <= end) {
      const destPath = path.join(destDir, file);
      fs.copyFileSync(filePath, destPath);
      copiedFiles.push(file);
    }
  }

  return NextResponse.json({ copiedFiles });
}
