import { getVideoById, getAllVideos,getFilmesByFiltro,inserirFilme, atualizarFilme , deletarFilme, buscarFilmesPorGenero, inserirFilmeGenero } from '../../model/DAO/video.js';

//funcao para listar todos os videos
export async function listarVideos(req, res) {
  const videos = await getAllVideos();
  res.status(200).json(videos);
}

//funcao para burcar filme por id
export async function buscarVideo(req, res) {
  const id = req.params.id;

  const video = await getVideoById(id);

  if (video.length === 0) {
    return res.status(404).json({ erro: 'FIlme não encontrado' });
  }

  res.status(200).json(video[0]);
}

//funcao para buscar filme pelo nome ou parte da sinopse
export async function filtrarFilmes(req, res) {
  try {
    const { nome } = req.query;

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório' });
    }

    const filmes = await getFilmesByFiltro(nome);

    if (filmes.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum filme encontrado para o filtro informado' });
    }

    return res.status(200).json(filmes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao filtrar filmes' });
  }
}

// Criar filme com upload
export async function postFilme(req, res) {
  try {
    // Agora também recebemos os gêneros enviados pelo front
    const { nome_filme, sinopse, ano, generos } = req.body;

    // Validação dos campos obrigatórios
    if (!nome_filme || !sinopse || !ano) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }

    // Validação dos arquivos enviados
    const capa = req.files?.capa?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    if (!capa || !video) {
      return res.status(400).json({ erro: 'Capa e vídeo são obrigatórios' });
    }

    // Monta o objeto do novo filme
    const novoFilme = {
      nome_filme,
      sinopse,
      ano,
      capa: `/public/capas/${capa}`,
      url_video: `/public/videos/${video}`
    };

    // 1️⃣ Insere o filme na tabela tbl_filmes
    const id_filme = await inserirFilme(novoFilme);

    // 2️⃣ Insere os gêneros na tabela relacional tbl_filme_genero
    // O front deve enviar: generos = [1, 3, 5]
    if (!generos || generos.length === 0) {
      console.warn("⚠ Nenhum gênero enviado. O filme ficará sem categoria.");
    } else {
      // Garante que seja array
      const listaGeneros = Array.isArray(generos) ? generos : [generos];

      for (const id_genero of listaGeneros) {
        await inserirFilmeGenero(id_filme, id_genero);
      }
    }

    // 3️⃣ Retorna sucesso
    return res.status(201).json({
      mensagem: 'Filme criado com sucesso',
      id_filme: id_filme
    });

  } catch (error) {
    console.error("Erro ao criar filme:", error);
    return res.status(500).json({ erro: 'Erro ao criar filme' });
  }
}

// Atualizar filme com upload opcional
export async function putFilme(req, res) {
  try {
    const id = req.params.id;

    const { nome_filme, sinopse, ano } = req.body;

    const capa = req.files?.capa?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    const dadosAtualizados = {
      nome_filme,
      sinopse,
      ano,
      capa: capa ? `/public/capas/${capa}` : req.body.capa_atual,
      url_video: video ? `/public/videos/${video}` : req.body.video_atual
    };

    const atualizado = await atualizarFilme(id, dadosAtualizados);

    if (!atualizado) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    return res.status(200).json({ mensagem: 'Filme atualizado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar filme' });
  }
}

//Funcao para DEletar o Filme
export async function deletarFilmeController(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: 'O parâmetro id é obrigatório' });
    }

    const linhasAfetadas = await deletarFilme(id);

    if (linhasAfetadas === 0) {
      return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }

    return res.status(200).json({ mensagem: 'Filme deletado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao deletar filme' });
  }
}

//buscar por genero

export async function getFilmesPorGenero(req, res) {
  try {
    const genero = req.query.genero;

    if (!genero) {
      return res.status(400).json({ erro: 'Informe o gênero na query: ?genero=acao' });
    }

    const filmes = await buscarFilmesPorGenero(genero);

    if (filmes.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum filme encontrado para esse gênero' });
    }

    return res.status(200).json(filmes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar filmes por gênero' });
  }
}