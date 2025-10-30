import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const get = query({
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user) {
            return {
                theme: "light" as "light" | "dark",
                shownOnbarding: true,
            }
        }

        const settings = await ctx.db
            .query("settings")
            .filter((q) => q.eq(q.field("userId"), user.id))
            .first();

        if(!settings) {
            return {
                theme: "light" as "light" | "dark",
                shownOnbarding: true,
            }
        }

        return {
            theme: settings.theme,
            shownOnbarding: settings.shownOnbarding,
        }
    }
});

export const set = mutation({
    args: {
        theme: v.optional(v.union(v.literal("light"), v.literal("dark"))),
        shownOnbarding: v.optional(v.boolean()),
    },
    handler: async (ctx, {theme, shownOnbarding}) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user) {
            throw new Error("Not authenticated");
        }

        const existingSettings = await ctx.db
            .query("settings")
            .filter((q) => q.eq(q.field("userId"), user.id))
            .first();
            
        if(existingSettings) {
            await ctx.db.insert("settings", {
                shownOnbarding: shownOnbarding ?? existingSettings.shownOnbarding,
                theme: theme ?? existingSettings.theme,
                userId: user.id as Id<"users">,
            });
        } else {
            await ctx.db.insert("settings", {
                userId: user.id as Id<"users">,
                theme: theme ?? "light",
                shownOnbarding: shownOnbarding ?? true,
            });
        }
    }
})