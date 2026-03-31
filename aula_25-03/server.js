
import Fastify from 'fastify'

const server = Fastify()

import cors from '@fastify/cors'

// Registramos o plugin de CORS para permitir que qualquer origem acesse nossa API
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

const PORT = 3000

const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true}
]




server.get('/tarefas', async (request, reply) => {
     const { busca, concluido } = request.query

    let resultado = tarefas

    if (busca) {
        resultado = resultado.filter(t =>
        t.descricao.toLowerCase().includes(busca.toLowerCase())
        )
    }

    if (concluido !== undefined) {
        resultado = resultado.filter(t =>
            String(t.concluido) === concluido
        )
    }

    return reply.send(resultado)

    })


// C: Criar uma nova tarefa (CREATE)
server.post('/tarefas', async (request, reply) => {
   
    const tarefa = request.body

    if (!tarefa.descricao || tarefa.descricao.trim() === '') {
        return reply.status(400).send({
            status: 'error',
            message: 'Descrição é obrigatória'
        })
    }
  
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
    const novaTarefa = { id: novoId, ...tarefa }
    tarefas.push(novaTarefa)

   
    return reply.status(201).send(novaTarefa)
})

server.get('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)


    const tarefa = tarefas.find(t => t.id === id)

    console.log("Resultado find:", tarefa)

    if (!tarefa) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    return reply.send(tarefa)
})

server.patch('/tarefas/:id', async (request, reply) => {
    // Extraímos o id de request.params e o convertendo para número, pois os parâmetros de rota são sempre strings.
    const id = Number(request.params.id)

    // Encontramos o índice da tarefa que corresponde ao ID fornecido. O método .findIndex() retorna o índice do primeiro elemento que satisfaz a condição, ou -1 se nenhum elemento for encontrado.
    const index = tarefas.findIndex(t => t.id === id)

    // Se o índice for -1, significa que a tarefa não foi encontrada, e respondemos com um status 404 (Not Found) e uma mensagem de erro. O 'return' é crucial para garantir que a função pare de executar após enviar a resposta.
    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    // O objeto enviado no body da requisição contém as propriedades que queremos atualizar. Ele pode conter apenas um campo ou vários campos, dependendo do que o cliente deseja modificar.
    const tarefaAtualizada = request.body

    // Aqui usamos o Spread Operator "..." para criar um novo objeto que combina as propriedades antigas da tarefa (tarefas[index]) com as novas propriedades enviadas no body (tarefaAtualizada). O ID é mantido intacto para garantir que a tarefa continue sendo identificada corretamente.
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }

    // Retornamos a tarefa atualizada como resposta. O status padrão 200 (OK) é aplicado automaticamente.
    return reply.send(tarefas[index])
})

server.patch('/tarefas/:id/concluir', async (request, reply) => {
    const id = Number(request.params.id)

    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    tarefas[index].concluido = !tarefas[index].concluido

    return reply.send(tarefas[index])
})

server.delete('/tarefas/:id', async (request, reply) => {

    
    const id = Number(request.params.id)
   
    const index = tarefas.findIndex(t => t.id === id)

   
    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    
    tarefas.splice(index, 1)

    
    return reply.status(204).send()
})

server.get('/tarefas/resumo', async (request, reply) => {
    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    return reply.send({
        total,
        concluidas,
        pendentes
    })
})

server.setNotFoundHandler((request, reply) => {

  return reply.status(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })

})

const start = async () => {
    try {
        await server.listen({port: PORT})
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
}



start()