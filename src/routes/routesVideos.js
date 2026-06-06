import express from 'express';
import { listarVideos, buscarVideo,filtrarFilmes, postFilme, putFilme, deletarFilmeController, getFilmesPorGenero  } from '../controller/video/controllerVideo.js';
import { upload } from '../middleware/upload.js';
import { streamVideo } from '../controller/video/streamController.js';
import { autenticarToken, somenteAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/videos', autenticarToken, listarVideos); // traz todos os Filmes
router.get('/videos/filmes',autenticarToken, filtrarFilmes); //buscar por nome ou sinopse
router.get('/videos/:id',autenticarToken, buscarVideo); // busca por id
router.post('/videos/filme', autenticarToken, somenteAdmin, upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),postFilme);  // Incluir novo filme
router.put('/filmes/:id', autenticarToken, somenteAdmin, upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), putFilme); // Atualizar filme
router.delete('/videos/:id',autenticarToken, somenteAdmin, deletarFilmeController) // Deletar Filme
router.get('/filmes/genero',autenticarToken, getFilmesPorGenero); //filme por generos
router.get('/stream/:video', streamVideo);// STREAMING DE VÍDEO


export default router;