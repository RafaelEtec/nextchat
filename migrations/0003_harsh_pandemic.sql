ALTER TABLE "rooms" ADD COLUMN "access" "role" DEFAULT 'USER';--> statement-breakpoint
ALTER TABLE "relations_rooms" DROP COLUMN "access";