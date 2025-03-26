import { v } from "convex/values";
import { query } from "./_generated/server";

export const getNotifications = query({
    args: { postId: v.id("posts") },
    handler:  async (ctx, args) ={

        const notifications = await ctx.db.query("notifications").withIndex()
    }
})