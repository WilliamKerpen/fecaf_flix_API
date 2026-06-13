/**
 * MODEL RESPONSAVEL PELO CRUD DOS DADOS
 * 
 * npm install --save mysql2 
 * Criar arquivo de config db.js
 *  
 */


// importa o DB
import db from '../../config/db.js';


//funcao que traz  filme por ID
export async function getVideoById(id) {
  const sql = 'SELECT * FROM tbl_filmes WHERE id_filme = ?'; //?  nunca é concatenado.recebe o valor separado e trata como dado, não como código.
  const params = [id];

  const [resultVideos] = await db.execute(sql, params);
  return resultVideos;
}

//funcao para buscar todos os Videos
export async function getAllVideos() {
  const sql = 'SELECT * FROM tbl_filmes order by id_filme desc';
  const [resultVideos] = await db.execute(sql);
  return resultVideos;
}

//funcao para buscar filme por NOME

export async function getFilmesByFiltro(nome) {
  // Busca por parte do nome OU parte da sinopse
  const sql = `
    SELECT *
    FROM tbl_filmes
    WHERE nome_filme LIKE ? 
       OR sinopse LIKE ?
  `;

  const filtro = `%${nome}%`;

  const [resultado] = await db.execute(sql, [filtro, filtro]);
  return resultado;
}


//funcao para INSERIR UM FILME

export async function inserirFilme(dadosFilme) {
  const sql = `
    INSERT INTO tbl_filmes (
      nome_filme,
      sinopse,
      ano,
      capa,
      url_video
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const params = [
    dadosFilme.nome_filme,
    dadosFilme.sinopse,
    dadosFilme.ano,
    dadosFilme.capa,
    dadosFilme.url_video
  ];

  const [result] = await db.execute(sql, params);
  return result.insertId; // retorna o ID criado
}

// ATUALIZAR Filmes

export async function atualizarFilme(id, dadosFilme) {
  const sql = `
    UPDATE tbl_filmes
    SET nome_filme = ?,
        sinopse = ?,
        ano = ?,
        capa = ?,
        url_video = ?
    WHERE id_filme = ?
  `;

  const params = [
    dadosFilme.nome_filme,
    dadosFilme.sinopse,
    dadosFilme.ano,
    dadosFilme.capa,
    dadosFilme.url_video,
    id
  ];

  const [result] = await db.execute(sql, params);
  return result.affectedRows; // retorna quantas linhas foram alteradas
}

//Deletar Filme

export async function deletarFilme(id) {
  const sql = `
    DELETE FROM tbl_filmes
    WHERE id_filme = ?
  `;

  const [result] = await db.execute(sql, [id]);
  return result.affectedRows; // retorna quantas linhas foram apagadas
}


// Buscar filmes por gênero
export async function buscarFilmesPorGenero(nome_genero) {
  const sql = `
    SELECT 
      f.id_filme,
      f.nome_filme,
      f.ano,
      f.sinopse,
      f.capa,
      f.url_video,
      g.nome_genero
    FROM tbl_filmes AS f
    INNER JOIN tbl_filme_genero AS fg
      ON f.id_filme = fg.id_filme
    INNER JOIN tbl_generos AS g
      ON fg.id_genero = g.id_genero
    WHERE g.nome_genero LIKE ?
  `;

  const [rows] = await db.execute(sql, [`%${nome_genero}%`]);
  return rows;
}

//inserir na tabela filme_genero
export async function inserirFilmeGenero(id_filme, id_genero) {
  const sql = `
    INSERT INTO tbl_filme_genero (id_filme, id_genero)
    VALUES (?, ?)
  `;

  await db.execute(sql, [id_filme, id_genero]);
}
