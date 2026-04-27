class FilaAtendimento {
  constructor() {
    this._fila = []
    this.contador = 1
  }

  entrar(nome) {
    console.log(`Senha ${this.contador} gerada para ${nome}.`)
    this._fila.push({ senha: this.contador, nome })
    this.contador++
  }

  chamarProximo() {
    if (this._fila.length === 0) return console.log("Fila vazia.")
    const p = this._fila.shift()
    console.log(`Chamando senha ${p.senha} — ${p.nome}`)
  }

  tamanho() {
    return this._fila.length
  }
}

const f = new FilaAtendimento()
f.entrar("Ana")
f.entrar("Bruno")
f.entrar("Carla")

f.chamarProximo()
f.chamarProximo()

console.log("Pessoas na fila:", f.tamanho())