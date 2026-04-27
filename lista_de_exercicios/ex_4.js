class Carrinho {
  constructor() {
    this.itens = []
  }

  adicionar(nome, preco, quantidade) {
    this.itens.push({ nome, preco, quantidade })
  }

  remover(nome) {
    const index = this.itens.findIndex(i => i.nome === nome)
    if (index === -1) {
      console.log("Item não encontrado.")
      return
    }
    this.itens.splice(index, 1)
  }

  total() {
    return this.itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
  }

  exibir() {
    this.itens.forEach(i => {
      console.log(`${i.quantidade}x ${i.nome} — R$ ${i.preco.toFixed(2)}`)
    })
    console.log(`Total: R$ ${this.total().toFixed(2)}`)
  }
}

const c = new Carrinho()
c.adicionar("Arroz", 10, 2)
c.adicionar("Sabão", 5.5, 1)
c.adicionar("Feijão", 8, 1)

c.remover("Feijão")
c.exibir()