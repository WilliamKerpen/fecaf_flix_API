//Imports
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { criarAdmin, buscarAdminPorNome, gerAllUserAdmin, gerAllUser } from '../../model/DAO/usersAdmin.js';


//Cadastrar USERAdimin
export async function cadastrarAdmin(req, res) {
  try {
    const { nome, senha, cargo } = req.body;

    if (!nome || !senha || !cargo) {
      return res.status(400).json({ erro: 'nome, cargo e senha são obrigatórios' });
    }

    //verifica se já existe um funcionario com o mesmo nome
    const existente = await buscarAdminPorNome(nome);
    if (existente) {
      return res.status(409).json({ erro: 'Já existe um Usuario com esse nome' });
    }

    //gera o hash da senha
    const senha_hash = await argon2.hash(senha);

    //cria o admin no banco
    const id = await criarAdmin({ nome, senha_hash, cargo });

    return res.status(201).json({
      mensagem: 'Admin criado com sucesso',
      id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar admin' });
  }
}


//Retorna todos os usuarios ADMINS cadastrados
export async function todosUserAdmin(req, res) {
  const userAdm = await gerAllUserAdmin();
  res.status(200).json(userAdm);
}


// Controle de LOGIN
export async function loginAdmin(req, res) {
  try {
    const { nome, senha } = req.body;

    //valida os dados
    if (!nome || !senha) {
      return res.status(400).json({ erro: 'Nome e senha são obrigatórios' });
    }

    //busca o admin pelo nome
    const admin = await buscarAdminPorNome(nome);

    if (!admin) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    //verifica a senha usando o hash salvo no banco
    const senhaValida = await argon2.verify(admin.senha_hash, senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    //gera o token JWT
    const token = jwt.sign(
      {
        id: admin.id_admin,   // ou admin.id, dependendo do nome da coluna
        nome: admin.nome,
        cargo: admin.cargo,
        tipo: "admin" 
      },
      process.env.JWT_SECRET, // precisa existir no .env
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao realizar login' });
  }
}

// retornar todos USERS PADRAO

export async function todosUser(req, res) {
  const user = await gerAllUser();
  res.status(200).json(user);
}
