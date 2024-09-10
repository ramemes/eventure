import { v } from "convex/values"; 
import { mutation, query } from "./_generated/server";

export const getEvents = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {

    const title = args.search as string;
    let events = []

    if (title) {
      events = await ctx.db
      .query("events")
      .withSearchIndex("search_title", (q) => 
        q
          .search("title", title)
      )
      .collect();

    } else {
      events = await ctx.db.query('events').collect()
    }
    return events
  }
})

export const getEvent = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId)
  }
})

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Unauthorized");
    }
    
    const newEventId = await ctx.db.insert("events", {
      title: args.title,
      startTime: args.startTime,
      endTime: args.endTime,
      description: args.description,
      creatorName: `${identity.givenName} ${identity.familyName}`,
      creatorId: identity.subject
    })
    
    return newEventId
  }
})