// importa o DB
import db from '../../config/db.js';

// Inserir novo gênero
export async function inserirGenero(nome_genero) {
  const sql = `
    INSERT INTO tbl_generos (nome_genero)
    VALUES (?)
  `;
  const [result] = await db.execute(sql, [nome_genero]);
  return result.insertId;
}

// Atualizar gênero existente
export async function atualizarGenero(id_genero, nome_genero) {
  const sql = `
    UPDATE tbl_generos
    SET nome_genero = ?
    WHERE id_genero = ?
  `;
  const [result] = await db.execute(sql, [nome_genero, id_genero]);
  return result.affectedRows > 0;
}

// Listar todos os gêneros
export async function listarGeneros() {
  const sql = `
    SELECT id_genero, nome_genero
    FROM tbl_generos
    ORDER BY nome_genero ASC
  `;
  const [rows] = await db.execute(sql);
  return rows;
}

// Buscar gênero por ID
export async function buscarGeneroPorId(id_genero) {
  const sql = `
    SELECT id_genero, nome_genero
    FROM tbl_generos
    WHERE id_genero = ?
  `;
  const [rows] = await db.execute(sql, [id_genero]);
  return rows[0];
}