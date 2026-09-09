import { boolean, date, integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'

// Esta descrição representa uma tabela existente; ela não altera o banco sozinha.
export const tarefas = pgTable('tarefas', {
  id: serial('id').primaryKey(),
  descricao: text('descricao').notNull(),
  concluido: boolean('concluido').notNull().default(false),
  projetoId: integer('projeto_id').references(() => projetos.id),
})

export const projetos = pgTable('projetos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  criado_em: timestamp('criado_em').notNull().defaultNow(),
})

export const detalhesProjeto = pgTable('detalhes_projeto', {
  id: serial('id').primaryKey(),
  projetoId: integer('projeto_id')
    .notNull()
    .unique()
    .references(() => projetos.id),
  descricaoLonga: text('descricao_longa'),
  observacoes: text('observacoes'),
  prazoFinal: date('prazo_final'),
})

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull().unique(),
})

export const tarefasTags = pgTable('tarefas_tags', {
  tarefaId: integer('tarefa_id')
    .notNull()
    .references(() => tarefas.id),

  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id),
}, (table) => [
  primaryKey({ columns: [table.tarefaId, table.tagId] }),
])