import {
  inserirGenero,
  atualizarGenero,
  listarGeneros,
  buscarGeneroPorId
} from '../../model/DAO/generos.js';

// Criar gênero
export async function postGenero(req, res) {
  try {
    const { nome_genero } = req.body;

    if (!nome_genero) {
      return res.status(400).json({ erro: 'O nome do gênero é obrigatório' });
    }

    const id = await inserirGenero(nome_genero);

    return res.status(201).json({
      mensagem: 'Gênero criado com sucesso',
      id_genero: id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar gênero' });
  }
}

// Atualizar gênero
export async function putGenero(req, res) {
  try {
    const id_genero = req.params.id_genero;
    const { nome_genero } = req.body;

    if (!nome_genero) {
      return res.status(400).json({ erro: 'O nome do gênero é obrigatório' });
    }

    const atualizado = await atualizarGenero(id_genero, nome_genero);

    if (!atualizado) {
      return res.status(404).json({ erro: 'Gênero não encontrado' });
    }

    return res.status(200).json({ mensagem: 'Gênero atualizado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar gênero' });
  }
}
