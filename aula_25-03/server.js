import Fastify from 'fastify'

const server = Fastify()

const PORT = 3000

const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true}
]

const start = async () => {
    try {
        await server.listen({port: PORT})
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
}



server.get('/tarefas', async (request, reply) => {
  return reply.send(tarefas)
})


start()