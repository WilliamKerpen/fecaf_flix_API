import express from 'express';
import { postGenero, putGenero } from '../controller/genero/controllerGeneros.js';
import { autenticarToken, somenteAdmin } from '../middleware/auth.js';
import { listarGeneros } from '../model/DAO/generos.js';

const routerGenero = express.Router();

// Criar gênero (somente admin)
routerGenero.post('/generos', autenticarToken, somenteAdmin, postGenero);

// Atualizar gênero (somente admin)
routerGenero.put('/generos/:id_genero', autenticarToken, somenteAdmin, putGenero);

// LIstar todos os generos

routerGenero.get('/generos', autenticarToken, listarGeneros)

export default routerGenero;