import { buscarProdutoPorId } from "./produto.service.js";

export default async function produtoRoutes(server) {
    server.get("/", async ()=> {
        return {
            message: "servidor online",
        };
    });
    
    server.get("/produtos/:id", async (request, reply) => {
    const produto = await buscarProdutoPorId(request.params.id);

    return reply.send({
      status: "success",
      data: produto
    });
  });


}