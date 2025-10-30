import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const getAll = query({
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity();
        
        if(!user) {
            return {
                theme: "light" as "light" | "dark",
                shownOnbarding: true,
            }
        }
        const settings = await ctx.db
            .query("archive")
            .filter((q) => q.eq(q.field("userId"), user.id))
            .collect();
        
        return settings.map(s => s.data);
    }
})

export const get = query({
    args: {
        id: v.id("archive"),
    },
    handler: async (ctx, {id}) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user) {
            return null;
        }

        const archiveItem = await ctx.db
            .query("archive")
            .filter((q) => q.and(
                q.eq(q.field("userId"), user.id),
                q.eq(q.field("_id"), id)
            ))
            .first();

        return archiveItem?? null;
    }
});

export const add = mutation({
    args: {
        data: v.object({}),
    },
    handler: async (ctx, {data}) => {
        const user = await ctx.auth.getUserIdentity();
        
        if(!user) {
            throw new Error("Not authenticated");
        }

        const archiveItemId = await ctx.db.insert("archive", {
            userId: user.id as Id<"users">,
            data,
        });

        return archiveItemId;
    }
})