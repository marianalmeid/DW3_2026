// @file: src/features/tarefa.repository.js
import pool from '../database/pool.js'

export class TarefaRepository {
  async buscarTodos(filtros = {}) {
    const condicoes = []
    const valores = []

    if (filtros.busca) {
      valores.push(`%${filtros.busca}%`)
      condicoes.push(`t.descricao ILIKE $${valores.length}`)
    }

    if (filtros.status) {
      const concluido = filtros.status === 'concluida'
      valores.push(concluido)
      condicoes.push(`t.concluido = $${valores.length}`)
    }

    let sql = `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p
        ON p.id = t.projeto_id
    `

    if (condicoes.length > 0) {
      sql += ` WHERE ${condicoes.join(' AND ')}`
    }

    sql += ` ORDER BY t.id`

    const resultado = await pool.query(sql, valores)
    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
        SELECT
          t.id,
          t.descricao,
          t.concluido,
          t.criada_em,
          t.projeto_id,
          p.nome AS projeto_nome
        FROM tarefas t
        LEFT JOIN projetos p
          ON p.id = t.projeto_id
        WHERE t.id = $1
      `,
      [id]
    )

    return resultado.rows[0] ?? null
  }

  async salvar(tarefa) {
    const resultado = await pool.query(
      `
        INSERT INTO tarefas (descricao, concluido, projeto_id)
        VALUES ($1, $2, $3)
        RETURNING id, descricao, concluido, criada_em, projeto_id
      `,
      [tarefa.descricao, tarefa.concluido, tarefa.projetoId]
    )

    return resultado.rows[0]
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.buscarPorId(id)

    if (!tarefaAtual) return null

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosAtualizados,
      id: tarefaAtual.id
    }

    const resultado = await pool.query(
      `
        UPDATE tarefas
        SET descricao = $1,
            concluido = $2,
            projeto_id = $3
        WHERE id = $4
        RETURNING id, descricao, concluido, criada_em, projeto_id
      `,
      [
        tarefaFinal.descricao,
        tarefaFinal.concluido,
        tarefaFinal.projetoId ?? tarefaFinal.projeto_id,
        id
      ]
    )

    return resultado.rows[0] ?? null
  }

  async remover(id) {
    const resultado = await pool.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rowCount > 0
  }

  async resumo() {
    const resultado = await pool.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE concluido = true)::int AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false)::int AS pendentes
      FROM tarefas
    `)

    return resultado.rows[0]
  }
}