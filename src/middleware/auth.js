/**
 * Objetivo, protejger as rotas sendo obrigatorio o login, 
 * 
 * 
 * 
 * 
 */

import jwt from 'jsonwebtoken';

// Middleware: qualquer usuário logado pode acessar
export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    req.user = usuario; // salva dados do usuário logado
    next();
  } catch (error) {
    return res.status(403).json({ erro: 'Token inválido' });
  }
}


// Middleware: somente admin pode acessar
export function somenteAdmin(req, res, next) {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ erro: 'Apenas administradores podem acessar esta rota' });
  }

  next();
}