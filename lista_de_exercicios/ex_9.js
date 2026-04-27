class Cliente {
  constructor(nome, email) {
    this.nome = nome
    this.email = email
  }

  exibir() {
    return `${this.nome} <${this.email}>`
  }
}

class Pedido {
  constructor(id, cliente) {
    this.id = id
    this.cliente = cliente
    this.itens = []
    this.status = "aberto"
  }

  adicionarItem(descricao, valor) {
    this.itens.push({ descricao, valor })
  }

  total() {
    return this.itens.reduce((acc, i) => acc + i.valor, 0)
  }

  fechar() {
    this.status = "fechado"
  }

  exibir() {
    console.log(`Pedido #${this.id} | Status: ${this.status}`)
    console.log(`Cliente: ${this.cliente.exibir()}`)
    console.log("Itens:")
    this.itens.forEach(i => {
      console.log(` - ${i.descricao}: R$ ${i.valor.toFixed(2)}`)
    })
    console.log(`Total: R$ ${this.total().toFixed(2)}`)
  }
}

const cli = new Cliente("Ana", "ana@email.com")
const ped = new Pedido(1, cli)

ped.adicionarItem("Teclado", 200)
ped.adicionarItem("Mouse", 80)

ped.fechar()
ped.exibir()