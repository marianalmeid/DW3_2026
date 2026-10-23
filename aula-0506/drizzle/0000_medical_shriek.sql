-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "tarefas" (
	"id" serial NOT NULL,
	"descricao" text NOT NULL,
	"concluido" boolean DEFAULT false,
	"criada_em" timestamp DEFAULT now(),
	"projeto_id" integer
);

CREATE TABLE "projetos" (
	"id" serial NOT NULL,
	"nome" text NOT NULL,
	"criado_em" timestamp
);

CREATE TABLE "detalhes_projeto" (
	"id" serial NOT NULL,
	"projeto_id" integer NOT NULL,
	"descricao_longa" text,
	"observacoes" text,
	"prazo_final" date
);

CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"nome" text NOT NULL
);

CREATE TABLE "tarefas_tags" (
	"tarefa_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);

ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "detalhes_projeto" ADD CONSTRAINT "fk_detalhes_projeto" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "fk_tarefa" FOREIGN KEY ("tarefa_id") REFERENCES "public"."tarefas"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "fk_tag" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
*/