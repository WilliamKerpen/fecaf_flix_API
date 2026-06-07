/****************************************************************************************
 * API para realizar o CRUD de FILMES para UNIFECAF-LIX
 * ------------------------------------------------------------------
 * Projeto realizado na materia de WEB Developing for Back Ende
 * Curso: ADS  pela faculdade UniFECAF
 * 
 * Aluno WILLIAM KERPEN
 * Data: 31.05.2026
 * versao: 1
 *************************************************************************************/

//Importe das bibliotecas para criacao da API
import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { request } from 'node:http'


//config datenv


//Importe das Rotas

import router from './src/routes/routesVideos.js';
import routerAdmin from './src/routes/routersUserAdm.js';
import routerUser from './src/routes/routersUser.js';
import routerGenero from './src/routes/routersGeneros.js';

const app = express();

app.use(cors({
  origin:'https://WilliamKerpen.github.io', //alterar para apenas meu github.// origin: 'https://WilliamKerpen..github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

    
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/v1/fecaf-flix', router, routerAdmin, routerUser, routerGenero);


app.listen(8080, () => {
  console.log('API rodando na porta 8080');
});

