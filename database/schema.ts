import { uuid, integer, pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { access } from 'fs';

//export const STATUS_ENUM = pgEnum('status', ['OFFLINE', 'ONLINE']);
export const FRIEND_STATUS_ENUM = pgEnum('friend_status', ['PENDING', 'ACCEPTED', 'WAITING']);
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const ACCESS_ENUM = pgEnum('access', ['USER', 'ADMIN']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    image: text('image'),
    createdAt: timestamp('created_at', {
        withTimezone: true,
    }).defaultNow(),
});

export const groups = pgTable('groups', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    thumbnail: text('thumbnail'),
    createdAt: timestamp('created_at', {
        withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
    }).defaultNow().$onUpdate(() => new Date()),
    creatorId: uuid('creator_id').notNull().references(() => users.id),
});

export const rooms = pgTable('rooms', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    access: ACCESS_ENUM('access').default("USER"),
    createdAt: timestamp('created_at', {
        withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
    }).defaultNow().$onUpdate(() => new Date()),
});

export const relationsUsers = pgTable('relations_users', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    friendId: uuid('friend_id').notNull().references(() => users.id),
    status: FRIEND_STATUS_ENUM('friend_status').default("PENDING"),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
    }).defaultNow().$onUpdate(() => new Date()),
});

export const relationsGroups = pgTable('relations_groups', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    groupId: uuid('group_id').notNull().references(() => groups.id),
    role: ROLE_ENUM('role').default("USER"),
});

export const relationsRooms = pgTable('relations_rooms', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    roomId: uuid('room_id').notNull().references(() => rooms.id),
    access: ACCESS_ENUM('access').default("USER"),
});


// export const postsTable = pgTable('posts_table', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
