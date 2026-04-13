// @file: src/ROUTES/tarefa.routes.js

import { atualizarTarefa, 
          concluirTarefa,
          criarTarefa,
          listarTarefas,
          obterResumo, 
          obterTarefa, 
          removerTarefa, 
          listarTarefasPendentes } from '../controllers/tarefa.controller.js'

export default async function tarefaRoutes(server, options) {


    server.get('/tarefas', async (request, reply) => {
        // LOG para indicar que a rota foi chamada
        console.log("Routes: GET /tarefas chamada");
        // Chama a função do controlador para processar a requisição
        listarTarefas(request, reply)
    })

    server.post('/tarefas', async (request, reply) => {
       // log
       console.log("Routes: POST /tarefa criada");

       criarTarefa(request, reply)
    })

    server.get('/tarefas/resumo', async (request, reply) => {
       console.log("Routes: GET / resumo das tarefas");

       obterResumo(request, reply)
    })

  server.get('/tarefas/:id', async (request, reply) => {
        console.log("Routes: GET /tareaf obtida");

        obterTarefa(request, reply)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
        console.log("Routes: PATCH / tarefa ataualizada");

        atualizarTarefa(request, reply)
  })

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    console.log("Routes: PATCH / tarefa concluida");

    concluirTarefa(request, reply)
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    console.log("Routes: DELETE / tarefa deletada");

    removerTarefa(request, reply)
  })

  server.get('/tarefas/pendentes', listarTarefasPendentes)
}

