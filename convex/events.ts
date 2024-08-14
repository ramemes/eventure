import { v } from "convex/values"; 
import { mutation, query } from "./_generated/server";

export const getEvents = query({
  handler: async (ctx) => {
    return await ctx.db.query('events').collect()
  }
})

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const date = Date.now()
    
    const newEventId = await ctx.db.insert("events", {
      title: args.title,
      date: date,
      description: args.description,
      creatorName: `${identity.givenName} ${identity.familyName}`,
      creatorId: identity.subject
    })
    return newEventId
  }
})