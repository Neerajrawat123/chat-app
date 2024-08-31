ALTER TABLE "conversations" ALTER COLUMN "lastmessage" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_lastmessage_messages_id_fk" FOREIGN KEY ("lastmessage") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
