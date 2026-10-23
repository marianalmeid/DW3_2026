ALTER TABLE "tarefas"
ADD COLUMN IF NOT EXISTS "prioridade" text DEFAULT 'media';