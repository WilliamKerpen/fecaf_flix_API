import express from 'express';
import { cadastrarAdmin, todosUserAdmin, loginAdmin, todosUser } from '../controller/userAdmin/controllerUserAdmin.js';
import { autenticarToken, somenteAdmin } from '../middleware/auth.js';

const routerAdmin = express.Router();

routerAdmin.get('/admin', autenticarToken, somenteAdmin, todosUserAdmin); // listar todos os users_admin
routerAdmin.post('/admin', autenticarToken, somenteAdmin, cadastrarAdmin); // cadastrar usuario adm
routerAdmin.post('/admin/login', loginAdmin); // realizar login
routerAdmin.get('/admin/users', autenticarToken, somenteAdmin, todosUser);


/**
 * router.get('/admin/logs', autenticarToken, somenteAdmin, listarLogs);
router.get('/admin/users', autenticarToken, somenteAdmin, listarAdmins);
router.get('/admin/assistidos/all', autenticarToken, somenteAdmin, listarTodosAssistidos)
 * 
 * 
 * 
 * */



export default routerAdmin;