class Estoque {
  constructor() {
    this.produtos = []
  }

  cadastrar(nome, quantidade) {
    if (this.produtos.find(p => p.nome === nome)) {
      console.log("Produto já cadastrado.")
      return
    }
    this.produtos.push({ nome, quantidade })
  }

  entrada(nome, quantidade) {
    const p = this.produtos.find(p => p.nome === nome)
    if (!p) return console.log("Produto não encontrado.")
    p.quantidade += quantidade
  }

  saida(nome, quantidade) {
    const p = this.produtos.find(p => p.nome === nome)
    if (!p) return console.log("Produto não encontrado.")
    if (p.quantidade < quantidade) {
      console.log("Quantidade insuficiente.")
      return
    }
    p.quantidade -= quantidade
  }

  exibir() {
    this.produtos.forEach(p => {
      console.log(`${p.nome}: ${p.quantidade} unidades`)
    })
  }
}

const e = new Estoque()
e.cadastrar("Caneta", 20)
e.cadastrar("Caderno", 10)

e.entrada("Caneta", 10)
e.saida("Caderno", 2)

e.exibir()