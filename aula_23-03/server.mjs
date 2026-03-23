
import Fastify from 'fastify'
const fastify = Fastify()

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (erro) {
  fastify.log.error(erro)
  process.exit(1)
}