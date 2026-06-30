import db from '../../config/db.js';

// Buscar usuário normal pelo email
export async function buscarUserPorEmail(email) {
  try {
    const sql = `
      SELECT id_user, nome, sobrenome, email, senha_hash, ativo, data_nascimento, data_criacao
      FROM tbl_users
      WHERE email = ?
    `;

    const result = await db.execute(sql, [email]);

    // Se o MySQL retornar algo inesperado
    if (!result || !Array.isArray(result) || result.length === 0) {
      return null;
    }

    const [rows] = result;

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];

  } catch (error) {
    console.error("ERRO NO DAO buscarUserPorEmail:", error);
    return null; // evita quebrar o fluxo
  }
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


// Deletar Usuario

export async function deletarUsuario(id_user) {
  const sql = `
    DELETE FROM tbl_users
    WHERE id_user = ?
  `;

  const [result] = await db.execute(sql, [id_user]);

  return result.affectedRows;
}

