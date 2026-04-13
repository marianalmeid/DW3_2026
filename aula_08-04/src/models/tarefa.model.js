let tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true }
]

// LISTAR
export async function listarTarefasModel(busca, concluido) {
    console.log("Model: listarTarefas chamada")

    let resultado = tarefas

    if (busca) {
        resultado = resultado.filter(t =>
            t.descricao.toLowerCase().includes(busca.toLowerCase())
        )
    }

    if (concluido !== undefined) {
        const concluidoBool = concluido === 'true'
        resultado = resultado.filter(t => t.concluido === concluidoBool)
    }

    return resultado
}

// CRIAR
export async function criarTarefaModel(descricao) {
    console.log("Model: criarTarefa chamada")

    const novoId = tarefas.length > 0
        ? tarefas[tarefas.length - 1].id + 1
        : 1

    const novaTarefa = { id: novoId, descricao, concluido: false }

    tarefas.push(novaTarefa)

    return novaTarefa
}

// RESUMO
export async function obterResumoModel() {
    console.log("Model: obterResumo chamada")

    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    return { total, concluidas, pendentes }
}

// OBTER POR ID
export async function obterTarefaModel(id) {
    console.log("Model: obterTarefa chamada")
    return tarefas.find(t => t.id === id)
}

// ATUALIZAR
export async function atualizarTarefaModel(id, dados) {
    console.log("Model: atualizarTarefa chamada")

    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) return null

    tarefas[index] = { ...tarefas[index], ...dados, id }

    return tarefas[index]
}

// CONCLUIR
export async function concluirTarefaModel(id) {
    console.log("Model: concluirTarefa chamada")

    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) return null

    tarefas[index].concluido = !tarefas[index].concluido

    return tarefas[index]
}

// REMOVER
export async function removerTarefaModel(id) {
    console.log("Model: removerTarefa chamada")

    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) return false

    tarefas.splice(index, 1)
    return true
}

export async function listarTarefasPendentesModel() {
    console.log("Model: listarTarefasPendentes chamada")

    return tarefas.filter(t => t.concluido === false)
}