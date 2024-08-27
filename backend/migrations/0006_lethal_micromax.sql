ALTER TABLE "conversations" ADD COLUMN "lastmessage" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "lastmessage";