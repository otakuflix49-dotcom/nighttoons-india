import {z} from "zod";
export const animeSchema=z.object({name:z.string().trim().min(1).max(200),description:z.string().max(10000).optional().default("AVAILABLE IN HINDI DUBBED"),image_url:z.string().url().nullable().optional(),published:z.boolean().default(true)});
export const linkSchema=z.object({label:z.string().trim().min(1).max(100),url:z.string().url().max(2000),sort_order:z.number().int().min(0).default(0)});
export const telegramSchema=z.object({slot:z.number().int().min(1).max(3),title:z.string().trim().min(1).max(200),description:z.string().max(1000).optional().nullable(),button_text:z.string().trim().min(1).max(80),channel_url:z.string().url().max(2000),active:z.boolean().default(true)});
