import db from '../../config/db.js';

/*
  ============================================================
  CRIAR ADMIN
  Tabela correta: tbl_user_admin
  Campos: nome, senha_hash, cargo
  ============================================================
*/
export async function criarAdmin({ nome, senha_hash, cargo }) {
  const sql = `
    INSERT INTO tbl_user_admin (nome, senha_hash, cargo)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(sql, [nome, senha_hash, cargo]);
  return result.insertId;
}

/*
  ============================================================
  BUSCAR ADMIN POR NOME
  Usado no login do admin
  ============================================================
*/
export async function buscarAdminPorNome(nome) {
  const sql = `
    SELECT * FROM tbl_user_admin
    WHERE nome = ?
  `;
  const [rows] = await db.execute(sql, [nome]);
  return rows[0]; // retorna 1 admin ou undefined
}

/*
  ============================================================
  LISTAR TODOS OS ADMINS
  (se você quiser listar admins no painel)
  ============================================================
*/
export async function gerAllUserAdmin() {
  const sql = 'SELECT * FROM tbl_user_admin ORDER BY nome ASC';
  const [result] = await db.execute(sql);
  return result;
}

/*
  ============================================================
  LISTAR TODOS OS USUÁRIOS NORMAIS
  Tabela correta: tbl_users
  ============================================================
*/
export async function gerAllUser() {
  const sql = 'SELECT * FROM tbl_users ORDER BY nome ASC';
  const [result] = await db.execute(sql);
  return result;
}
