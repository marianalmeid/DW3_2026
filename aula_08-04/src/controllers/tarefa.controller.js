import model from '../models/tarefa.model.js'

// LISTAR
export async function listar(request, reply) {
    console.log("Controller: listarTarefas chamado")

    const { busca, concluido } = request.query

    const resultado = await model.listar({busca, concluido})

    return reply.send(resultado)
}

// CRIAR
export async function criar(request, reply) {
    const { descricao } = request.body

    if (!descricao || descricao.trim() === '') {
        return reply.status(400).send({
            status: 'error',
            message: 'A descrição da tarefa é obrigatória'
        })
    }

    const novaTarefa = await model.criar({descricao})

    return reply.status(201).send(novaTarefa)
}

// RESUMO
export async function obterResumo(request, reply) {
    const resumo = await model.obterResumo({})
    return reply.send(resumo)
}

// OBTER POR ID
export async function obterTarefa(request, reply) {
    const id = Number(request.params.id)

    const tarefa = await model.obterTarefaModel(id)

    if (!tarefa) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    return reply.send(tarefa)
}

// ATUALIZAR
export async function atualizarTarefa(request, reply) {
    const id = Number(request.params.id)

    const tarefa = await model.atualizarTarefaModel(id, request.body)

    if (!tarefa) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    return reply.send(tarefa)
}

// CONCLUIR
export async function concluirTarefa(request, reply) {
    const id = Number(request.params.id)

    const tarefa = await model.concluirTarefaModel(id)

    if (!tarefa) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    return reply.send(tarefa)
}

// REMOVER
export async function removerTarefa(request, reply) {
    const id = Number(request.params.id)

    const removido = await model.removerTarefaModel(id)

    if (!removido) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    return reply.status(204).send()
}

export async function listarTarefasPendentes(request, reply) {
    console.log("Controller: listarTarefasPendentes chamado")

    const tarefasPendentes = await model.listarTarefasPendentesModel()

    return reply.send(tarefasPendentes)
}