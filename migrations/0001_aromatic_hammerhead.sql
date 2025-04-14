ALTER TABLE "rooms" DROP CONSTRAINT "rooms_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;