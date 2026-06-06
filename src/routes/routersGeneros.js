import express from 'express';
import { postGenero, putGenero } from '../controller/genero/controllerGeneros.js';
import { autenticarToken, somenteAdmin } from '../middleware/auth.js';

const routerGenero = express.Router();

// Criar gênero (somente admin)
routerGenero.post('/generos', autenticarToken, somenteAdmin, postGenero);

// Atualizar gênero (somente admin)
routerGenero.put('/generos/:id_genero', autenticarToken, somenteAdmin, putGenero);

export default routerGenero;