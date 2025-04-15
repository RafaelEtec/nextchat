import { z } from "zod";

export const inviteByEmailSchema = z.object({
  email: z.string().email("E-mail Inválido").nonempty("É necessário informar o E-mail"),
  userId: z.string().nonempty(),
  friendId: z.string(),
});

export const inviteByTagSchema = z.object({
  tag: z.string().nonempty("É necessário informar a Tag"),
});

// export const roomSchema = z.object({
//   title: z.string().trim().min(2).max(100),
//   description: z.string().trim().min(10).max(1000),
//   author: z.string().trim().min(2).max(100),
//   genre: z.string().trim().min(2).max(50),
//   rating: z.coerce.number().min(1).max(5),
//   totalCopies: z.coerce.number().int().positive().lte(10000),
//   coverUrl: z.string().nonempty(),
//   coverColor: z
//     .string()
//     .trim()
//     .regex(/^#[0-9A-F]{6}$/i),
//   videoUrl: z.string().nonempty(),
//   summary: z.string().trim().min(10),
// });