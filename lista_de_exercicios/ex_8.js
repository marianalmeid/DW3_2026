class Documento {
  constructor(titulo) {
    this.titulo = titulo
    this.conteudo = ""
    this._historico = []
  }

  editar(novo) {
    this._historico.push(this.conteudo)
    this.conteudo = novo
  }

  desfazer() {
    if (this._historico.length === 0) {
      console.log("Nada para desfazer.")
      return
    }
    this.conteudo = this._historico.pop()
  }

  exibir() {
    console.log(`[${this.titulo}] Conteúdo atual: ${this.conteudo}`)
  }
}

const d = new Documento("Relatório")
d.editar("Primeira versão")
d.editar("Segunda versão")
d.editar("Terceira versão")

d.desfazer()
d.desfazer()

d.exibir()