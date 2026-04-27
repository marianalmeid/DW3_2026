class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo
    this.autor = autor
    this.disponivel = true
  }

  emprestar() {
    if (!this.disponivel) return console.log("Livro indisponível.")
    this.disponivel = false
  }

  devolver() {
    this.disponivel = true
  }

  exibir() {
    return `${this.titulo} — ${this.autor} — ${this.disponivel ? "Disponível" : "Indisponível"}`
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome
    this.acervo = []
  }

  adicionar(livro) {
    this.acervo.push(livro)
  }

  buscar(titulo) {
    return this.acervo.find(l => l.titulo === titulo) || null
  }

  emprestar(titulo) {
    const livro = this.buscar(titulo)
    if (!livro) return console.log("Livro não encontrado.")
    livro.emprestar()
  }

  devolver(titulo) {
    const livro = this.buscar(titulo)
    if (livro) livro.devolver()
  }

  exibirAcervo() {
    this.acervo.forEach(l => console.log(l.exibir()))
  }
}

const b = new Biblioteca("Central")

b.adicionar(new Livro("O Alquimista", "Paulo Coelho"))
b.adicionar(new Livro("Dom Casmurro", "Machado de Assis"))
b.adicionar(new Livro("1984", "George Orwell"))

b.emprestar("Dom Casmurro")
b.emprestar("1984")
b.devolver("1984")

b.exibirAcervo()