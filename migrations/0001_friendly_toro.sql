ALTER TABLE "groups" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "relations_users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "updated_at" DROP NOT NULL;