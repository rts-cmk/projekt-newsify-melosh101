import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
    settings: defineTable({
        userId: v.id("users"),
        theme: v.union(v.literal("light"), v.literal("dark")),
        shownOnbarding: v.boolean(),
    }),

    archive: defineTable({
        userId: v.id("users"),
        data: v.object({}),
    }),
    ...authTables,
});