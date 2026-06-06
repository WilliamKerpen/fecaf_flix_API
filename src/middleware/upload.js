import multer from 'multer';
import path from 'path';

// Extensões permitidas
const allowedImages = ['.jpg', '.jpeg', '.png', '.webp'];
const allowedVideos = ['.mp4', '.mkv', '.webm'];

// Função para validar extensão
function validateExtension(file, allowedExtensions) {
  const ext = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(ext);
}

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'capa') {
      cb(null, 'public/capas');
    } else if (file.fieldname === 'video') {
      cb(null, 'public/videos');
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  }
});

// Filtro de segurança
function fileFilter(req, file, cb) {
  if (file.fieldname === 'capa') {
    if (!validateExtension(file, allowedImages)) {
      return cb(new Error('Formato de imagem inválido'), false);
    }
  }

  if (file.fieldname === 'video') {
    if (!validateExtension(file, allowedVideos)) {
      return cb(new Error('Formato de vídeo inválido'), false);
    }
  }

  cb(null, true);
}

// Limites de segurança
const limits = {
  fileSize: 1024 * 1024 * 200 // 200MB
};

export const upload = multer({ storage, fileFilter, limits });
