import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { rename } from 'fs/promises';

const TARGET_FOLDER_PATH = path.resolve(process.env.HOME || '', 'Downloads');
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
  return folder ? path.join(TARGET_FOLDER_PATH, folder) : null;
}

async function moveFile(filePath: string) {
  const fileName = path.basename(filePath);
  const destFolder = getFileDestination(fileName);
  if (!destFolder) return;

  await fs.promises.mkdir(destFolder, { recursive: true });
  const destPath = path.join(destFolder, fileName);
  await rename(filePath, destPath);
  console.log(`✔️ ${fileName} movido para ${destFolder}`);
}

function startWatcher() {
  console.log(`🔍 Observando: ${TARGET_FOLDER_PATH}`);

  const watcher = chokidar.watch(TARGET_FOLDER_PATH, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  watcher.on('add', async (filePath) => {
    try {
      await moveFile(filePath);
    } catch (err) {
      console.error(`❌ Erro ao mover ${filePath}:`, err);
    }
  });
}

startWatcher();
