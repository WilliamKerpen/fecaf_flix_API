import fs from 'fs';
import path from 'path';

export function streamVideo(req, res) {
  const videoName = req.params.video;

  const videoPath = path.join('public/videos', videoName);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ erro: 'Vídeo não encontrado' });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  const range = req.headers.range;

  if (!range) {
    return res.status(416).json({ erro: 'Range header obrigatório para streaming' });
  }

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4'
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
}