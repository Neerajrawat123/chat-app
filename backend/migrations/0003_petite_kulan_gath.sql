CREATE TABLE IF NOT EXISTS "messageStatus" (
	"messageId" integer,
	"userId" integer,
	"status" varchar DEFAULT 'unseen',
	"seenAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messageStatus" ADD CONSTRAINT "messageStatus_messageId_messages_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messageStatus" ADD CONSTRAINT "messageStatus_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
