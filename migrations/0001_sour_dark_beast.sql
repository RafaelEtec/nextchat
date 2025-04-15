ALTER TABLE "relations_rooms" DROP CONSTRAINT "relations_rooms_user_id_users_tag_fk";
--> statement-breakpoint
ALTER TABLE "relations_users" DROP CONSTRAINT "relations_users_user_id_users_tag_fk";
--> statement-breakpoint
ALTER TABLE "relations_users" DROP CONSTRAINT "relations_users_friend_id_users_tag_fk";
--> statement-breakpoint
ALTER TABLE "relations_rooms" ADD CONSTRAINT "relations_rooms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relations_users" ADD CONSTRAINT "relations_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relations_users" ADD CONSTRAINT "relations_users_friend_id_users_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "tag";