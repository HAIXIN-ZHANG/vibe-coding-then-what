import { withBasePath } from '../config/deployment.ts';
import { volumeOnePdf } from '../content/downloads.ts';

export function VolumeOneDownload() {
  return <a className="text-link" href={withBasePath(volumeOnePdf.path, process.env.NEXT_PUBLIC_BASE_PATH)} download>
    下载中文 A5 PDF
  </a>;
}
