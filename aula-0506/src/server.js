import 'dotenv/config'
import Fastify from 'fastify'

import tarefaRoutes from './features/tarefa.routes.js'
import pool from './database/pool.js'

const server = Fastify({ logger: true })

server.register(tarefaRoutes)

const start = async () => {
  try {
    await pool.query('SELECT 1')
    console.log('Conectado ao PostgreSQL com sucesso')

    await server.listen({ port: 3000 })

    console.log('Servidor rodando')
  } catch (err) {
    console.error('Falha ao iniciar a aplicação:', err)
    process.exit(1)
  }
}

start()