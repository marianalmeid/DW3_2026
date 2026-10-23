import { pgTable, foreignKey, serial, text, boolean, timestamp, integer, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tarefas = pgTable("tarefas", {
	id: serial().notNull(),
	descricao: text().notNull(),
	concluido: boolean().default(false),
	criadaEm: timestamp("criada_em", { mode: 'string' }).defaultNow(),
	projetoId: integer("projeto_id"),
}, (table) => [
	foreignKey({
			columns: [table.projetoId],
			foreignColumns: [projetos.id],
			name: "tarefas_projeto_id_fkey"
		}),
]);

export const projetos = pgTable("projetos", {
	id: serial().notNull(),
	nome: text().notNull(),
	criadoEm: timestamp("criado_em", { mode: 'string' }),
});

export const detalhesProjeto = pgTable("detalhes_projeto", {
	id: serial().notNull(),
	projetoId: integer("projeto_id").notNull(),
	descricaoLonga: text("descricao_longa"),
	observacoes: text(),
	prazoFinal: date("prazo_final"),
}, (table) => [
	foreignKey({
			columns: [table.projetoId],
			foreignColumns: [projetos.id],
			name: "fk_detalhes_projeto"
		}),
]);

export const tags = pgTable("tags", {
	id: serial().notNull(),
	nome: text().notNull(),
});

export const tarefasTags = pgTable("tarefas_tags", {
	tarefaId: integer("tarefa_id").notNull(),
	tagId: integer("tag_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tarefaId],
			foreignColumns: [tarefas.id],
			name: "fk_tarefa"
		}),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "fk_tag"
		}),
]);
