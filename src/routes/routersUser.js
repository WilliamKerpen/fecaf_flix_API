import express from 'express';
import { cadastrarUser, loginUser, putUser, deletarUserController } from '../controller/user/controllerUser.js';
import { autenticarToken } from '../middleware/auth.js'

const routerUser = express.Router();


routerUser.post('/user', cadastrarUser); // Cadastro de usuário normal
routerUser.post('/login', loginUser); // Login de usuário normal
routerUser.put('/user/:id_user', autenticarToken, putUser); // Atualizar usuário normal (precisa estar logado)
router.delete('/user', autenticarToken, deletarUserController); // deletar Usuario

export default routerUser;
