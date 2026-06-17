// @file: src/features/tarefa.service.js
import { AppError } from '../errors/AppError.js'

export class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listarTarefas(filtros) {
    return this.repository.buscarTodos(filtros)
  }

  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id)

    if (!tarefa) {
      throw new AppError('Tarefa não encontrada', 404)
    }

    return tarefa
  }

  async criarTarefa(dados) {
    if (!dados.descricao || dados.descricao.trim() === '') {
      throw new AppError('A descrição é obrigatória', 400)
    }

    if (!dados.projetoId) {
      throw new AppError('O projeto é obrigatório', 400)
    }

    const tarefas = await this.repository.buscarTodos()

    const descricaoJaExiste = tarefas.some(
      t => t.descricao.toLowerCase() === dados.descricao.toLowerCase().trim()
    )

    if (descricaoJaExiste) {
      throw new AppError('Já existe uma tarefa com essa descrição', 400)
    }

    return this.repository.salvar({
      descricao: dados.descricao.trim(),
      concluido: false,
      projetoId: dados.projetoId
    })
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.concluido) {
      throw new AppError(
        'Não é possível atualizar uma tarefa já concluída',
        400
      )
    }

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    return this.repository.atualizar(id, {
      concluido: !tarefa.concluido
    })
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.concluido) {
      throw new AppError(
        'Não é possível remover uma tarefa já concluída',
        400
      )
    }

    return this.repository.remover(id)
  }

  async resumoTarefas() {
    return this.repository.resumo()
  }
}