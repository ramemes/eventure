import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({ 
    title: v.string(),
    startTime: v.number(),
    endTime: v.number(),
    description: v.string(),
    creatorId: v.string(),
    creatorName: v.string()
  })
    .index("by_title", ['title'])
    .index("by_date", ["startTime"])
    // .index("by_location", ["location"]) //add location
    .searchIndex("search_title", {
      searchField: "title"
    }),

  tickets: defineTable({
    eventId: v.id("events"),
    userId: v.string(),
    googleEventId: v.optional(v.string())
  })
    .index("by_event", ["eventId"])
    .index("by_google_event", ["googleEventId"])
    .index("by_user", ["userId"])
    .index("by_user_event", ["userId", "eventId"])
  
}); 