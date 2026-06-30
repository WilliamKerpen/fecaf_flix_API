import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { buscarUserPorEmail, criarUser, atualizarUser, deletarUsuario } from '../../model/DAO/users.js';

// Cadastrar usuário normal
export async function cadastrarUser(req, res) {
  try {
    const { nome, sobrenome, email, senha, data_nascimento } = req.body;

    if (!nome || !sobrenome || !email || !senha || !data_nascimento) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Verifica se já existe usuário com o mesmo email
    const existente = await buscarUserPorEmail(email);
    if (existente) {
      return res.status(409).json({ erro: 'Já existe um usuário com esse email' });
    }

    // Gera hash da senha
    const senha_hash = await argon2.hash(senha);

    // Cria usuário com ativo = 1
    const id = await criarUser({
      nome,
      sobrenome,
      email,
      senha_hash,
      ativo: 1,
      data_nascimento
    });

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      id_user: id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

// Login do usuário normal
export async function loginUser(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const user = await buscarUserPorEmail(email);

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    if (user.ativo !== 1) {
      return res.status(403).json({ erro: 'Usuário inativo' });
    }

    const senhaValida = await argon2.verify(user.senha_hash, senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    // Gera token com tipo USER
    const token = jwt.sign(
      {
        id_user: user.id_user,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        tipo: "user"
      },
      process.env.JWT_SECRET,
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

// Atualizar usuário normal
export async function putUser(req, res) {
  try {
    const id_user = req.params.id_user;
    const { nome, sobrenome, email, senha, ativo, data_nascimento } = req.body;

    if (!nome || !sobrenome || !email || !data_nascimento) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }

    // Verifica se o usuário existe
    const existente = await buscarUserPorEmail(email);

    // Se existe outro usuário com o mesmo email → erro
    if (existente && existente.id_user != id_user) {
      return res.status(409).json({ erro: 'Email já está em uso por outro usuário' });
    }

    // Se enviou senha → gerar novo hash
    let senha_hash = existente?.senha_hash;
    if (senha) {
      senha_hash = await argon2.hash(senha);
    }

    const atualizado = await atualizarUser(id_user, {
      nome,
      sobrenome,
      email,
      senha_hash,
      ativo,
      data_nascimento
    });

    if (!atualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
}

// deletar Usuario

export async function deletarUserController(req, res) {
  try {
    const id_user = req.user.id_user;

    const linhasAfetadas = await deletarUsuario(id_user);

    if (linhasAfetadas === 0) {
      return res.status(404).json({
        erro: 'Usuário não encontrado'
      });
    }

    return res.status(200).json({
      mensagem: 'Usuário deletado com sucesso'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro ao deletar usuário'
    });
  }
}