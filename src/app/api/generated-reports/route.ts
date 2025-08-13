import fs from 'fs/promises';
import path from 'path';

export async function getFilenamesFromFolder(
  folderPath: string
): Promise<string[]> {
  try {
    const files = await fs.readdir(folderPath);
    // Optionally filter only files (skip subfolders)
    // const filenames = [];
    // for (const file of files) {
    //   const stat = await fs.stat(path.join(folderPath, file));
    //   if (stat.isFile()) filenames.push(file);
    // }
    // return filenames;
    return files;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

// Usage example in an API route:

export async function GET() {
  const folderPath = path.resolve(process.env.NEXT_PUBLIC_REPORTS_PATH);
  const generatedReportData = await getFilenamesFromFolder(folderPath);

  return new Response(JSON.stringify({ generatedReportData }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
