import fs from 'fs';
import path from 'path';
import { rename } from 'fs/promises';

const DOWNLOADS_PATH = path.resolve(process.env.HOME || '', 'Downloads');

const FILE_DESTINATIONS: Record<string, string> = {
  '.pdf': 'PDF',
  '.doc': 'Docs',
  '.docx': 'Docs',
  '.odt': 'Docs',
  '.txt': 'Texts',
  '.rtf': 'Texts',
  '.md': 'Texts',
  '.jpg': 'Images',
  '.jpeg': 'Images',
  '.png': 'Images',
  '.gif': 'Images',
  '.svg': 'Images',
  '.webp': 'Images',
  '.mp3': 'Audio',
  '.wav': 'Audio',
  '.ogg': 'Audio',
  '.flac': 'Audio',
  '.mp4': 'Video',
  '.mkv': 'Video',
  '.webm': 'Video',
  '.xlsx': 'Sheets',
  '.xls': 'Sheets',
  '.xlsm': 'Sheets',
  '.xlsb': 'Sheets',
  '.csv': 'Sheets',
  '.ods': 'Sheets',
  '.ppt': 'Slides',
  '.pptx': 'Slides',
  '.odp': 'Slides',
  '.zip': 'Zips',
  '.rar': 'Zips',
  '.7z': 'Zips',
  '.tar': 'Zips',
  '.gz': 'Zips',
  '.xz': 'Zips',
  '.bz2': 'Zips',
  '.appimage': 'Executables',
  '.deb': 'Executables',
  '.rpm': 'Executables',
  '.bin': 'Executables',
  '.run': 'Executables',
  '.sh': 'Executables',
  '.js': 'Code',
  '.ts': 'Code',
  '.py': 'Code',
  '.java': 'Code',
  '.c': 'Code',
  '.cpp': 'Code',
  '.cs': 'Code',
  '.html': 'Code',
  '.css': 'Code',
  '.json': 'Code',
  '.yml': 'Code',
  '.yaml': 'Code',
  '.xml': 'Code',
  '.sql': 'Code',
  // certificates
  '.pem': 'Certificates',
  '.pfx': 'Certificates'
};

function getFileDestination(fileName: string): string | null {
  const ext = path.extname(fileName).toLowerCase();
  const folder = FILE_DESTINATIONS[ext];
  return folder ? path.join(DOWNLOADS_PATH, folder) : null;
}

async function organizeAllFiles() {
  const files = await fs.promises.readdir(DOWNLOADS_PATH);
  for (const file of files) {
    const fullPath = path.join(DOWNLOADS_PATH, file);
    const stats = await fs.promises.stat(fullPath);
    if (stats.isFile()) {
      const destFolder = getFileDestination(file);
      if (destFolder) {
        await fs.promises.mkdir(destFolder, { recursive: true });
        const destPath = path.join(destFolder, file);
        await rename(fullPath, destPath);
        console.log(`✔️ ${file} movido para ${destFolder}`);
      }
    }
  }
}

organizeAllFiles().catch(console.error);
