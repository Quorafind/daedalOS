import JsFileTypeIcon from '@/public/icons/types/js.svg';
import PdfFileTypeIcon from '@/public/icons/types/pdf.svg';
import UnknownFileTypeIcon from '@/public/icons/types/unknown.svg';

import type { Stats } from 'browserfs/dist/node/generic/emscripten_fs';
import type { FSModule } from 'browserfs/dist/node/core/FS';
import type { StatsProto } from '@/utils/directory';

const bytesInKB = 1024,
  fileSizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];

export const getFileIcon = (filePath: string, ext: string): string => {
  switch (ext) {
    case 'png':
    case 'ico':
    case 'svg':
      return filePath;
    case 'jsdos':
      return '/icons/apps/dos.png';
    case 'js':
    case 'json':
    case 'min.js':
    case 'wasm.js':
    case 'worker.js':
      return JsFileTypeIcon;
    case 'mp3':
    case 'm3u':
    case 'wsz':
      return '/icons/apps/winamp.png';
    case 'pdf':
      return PdfFileTypeIcon;
    default:
      return UnknownFileTypeIcon;
  }
};

export const getFileKind = (ext: string): string => {
  switch (ext) {
    case 'txt':
      return 'Plain Text';
    case 'json':
      return 'JSON Document';
    case 'ico':
      return 'Icon Image';
    case 'woff2':
      return 'Web Font';
    case 'zip':
      return 'ZIP Archive';
    case 'mp3':
      return 'MP3 Audio';
    case 'js':
      return 'JS Document';
    case 'wsz':
      return 'Winamp Skin';
    case 'url':
      return 'Shortcut';
    default:
      return '';
  }
};

export const getFileExtension = (path = ''): string => {
  const [, ...ext] = path?.split?.('/')?.pop?.()?.split?.('.') || [];

  return ext.length >= 2 ? ext.slice(ext.length - 2).join('.') : ext[0] || '';
};

export const getFileStat = (
  fs: FSModule,
  path: string
): Promise<Stats & StatsProto> =>
  new Promise((resolve) => fs?.stat?.(path, (_error, stats) => resolve(stats)));

export const getFormattedSize = (size: number): string => {
  if (size === 0) return 'Zero bytes';
  if (size === 1) return '1 byte';

  const sizeFactor = Math.floor(Math.log(size) / Math.log(bytesInKB)),
    newSize = Math.round(size / Math.pow(bytesInKB, sizeFactor));

  return `${newSize} ${fileSizes[sizeFactor]}`;
};

export const hasExtension = (path = ''): boolean => {
  return getFileExtension(path) === '';
};