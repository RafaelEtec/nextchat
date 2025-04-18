CREATE TYPE "public"."access" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
ALTER TABLE "relations_rooms" RENAME COLUMN "role" TO "access";--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "access" SET DATA TYPE access;