import db from '../../config/db.js';

//Cadastrat Usuario Admin
export async function criarAdmin({ nome, senha_hash, cargo }) {
  const sql = `
    INSERT INTO tbl_user_admin (nome, senha_hash, cargo)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(sql, [nome, senha_hash, cargo]);
  return result.insertId;
}

//Burcar Users por Nome

export async function buscarAdminPorNome(nome) {
  const sql = `
    SELECT * FROM tbl_user_admin
    WHERE nome = ?
  `;
  const [rows] = await db.execute(sql, [nome]);
  return rows[0]; // retorna 1 usuário ou undefined
}

//Buscar todos os funcionarios ADM
export async function gerAllUserAdmin() {
  const sql = 'SELECT * FROM tbl_user_admin order by nome desc';
  const [resultUserAdmin] = await db.execute(sql);
  return resultUserAdmin;
}

//listar todos os usuarios
export async function gerAllUser() {
  const sql = 'SELECT * FROM tbl_user order by nome desc';
  const [resultUserAdmin] = await db.execute(sql);
  return resultUserAdmin;
}