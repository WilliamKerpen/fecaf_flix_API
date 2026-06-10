import db from '../../config/db.js';

// Buscar usuário normal pelo email
export async function buscarUserPorEmail(email) {
  const sql = `
    SELECT id_user, nome, sobrenome, email, senha_hash, ativo, data_nascimento, data_criacao
    FROM tbl_users
    WHERE email = ?
  `;

  const [rows] = await db.execute(sql, [email]);

  // Se não encontrou, retorna null 
  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0];
}

// Criar usuário normal
export async function criarUser({ nome, sobrenome, email, senha_hash, ativo, data_nascimento }) {
  const sql = `
    INSERT INTO tbl_users (nome, sobrenome, email, senha_hash, ativo, data_nascimento, data_criacao)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;
  const [result] = await db.execute(sql, [
    nome,
    sobrenome,
    email,
    senha_hash,
    ativo,
    data_nascimento
  ]);

  return result.insertId;
}

// Atualizar usuário normal
export async function atualizarUser(id_user, dados) {
  const sql = `
    UPDATE tbl_users
    SET nome = ?, sobrenome = ?, email = ?, senha_hash = ?, ativo = ?, data_nascimento = ?
    WHERE id_user = ?
  `;

  const params = [
    dados.nome,
    dados.sobrenome,
    dados.email,
    dados.senha_hash,
    dados.ativo,
    dados.data_nascimento,
    id_user
  ];

  const [result] = await db.execute(sql, params);
  return result.affectedRows > 0;
}


