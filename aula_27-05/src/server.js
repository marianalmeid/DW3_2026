import Fastify from 'fastify'
import cors from '@fastify/cors'
import tarefaRoutes from './modules/produtos/produto.routes.js'
import client from './database/cliente.js'

const server = Fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

server.register(tarefaRoutes, { prefix: '/tarefas' })

server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.'
  })
})

const PORT = 3000

const start = async () => {
  try {
    // Antes de aceitar requisições, a aplicação tenta falar com o banco
    await client.connect()
    console.log('Conectado ao PostgreSQL com sucesso')

    await server.listen({ port: PORT })
    console.log(`Servidor rodando em <http://localhost>:${PORT}`)
  } catch (erro) {
    console.error('Falha ao iniciar a aplicação:', erro)
    process.exit(1)
  }
}

server.get('/laboratorio/tarefas-db', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})
server.post('/laboratorio/tarefas-db', async (request, reply) => {
  const { descricao, concluido } = request.body

  const resultado = await client.query(
    `
    INSERT INTO tarefas (descricao, concluido)
    VALUES ($1, $2)
    RETURNING *
    `,
    [descricao, concluido]
  )

  return reply.status(201).send(resultado.rows[0])
})

server.get('/laboratorio/tarefas-concluidas', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    WHERE concluido = true
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})


start()