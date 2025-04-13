CREATE TYPE "public"."friend_status" AS ENUM('PENDING', 'ACCEPTED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "relations_rooms" (
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"role" "role" DEFAULT 'USER'
);
--> statement-breakpoint
CREATE TABLE "relations_users" (
	"user_id" uuid NOT NULL,
	"friend_status" "friend_status" DEFAULT 'PENDING'
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"thumbnail" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "rooms_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "relations_rooms" ADD CONSTRAINT "relations_rooms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relations_rooms" ADD CONSTRAINT "relations_rooms_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relations_users" ADD CONSTRAINT "relations_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;