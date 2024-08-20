import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({ 
    title: v.string(),
    date: v.number(),
    description: v.string(),
    creatorId: v.string(),
    // location: v.string(),
    // fileId: v.id("_storage"),
    // tags: v.array(v.string())
    creatorName: v.string()
  })
    .index("by_title", ['title'])
    .index("by_date", ["date"])
    // .index("by_location", ["location"]) //add location
    .searchIndex("search_title", {
      searchField: "title"
    }),

  tickets: defineTable({
    eventId: v.id("events"),
    userId: v.string(),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_user_event", ["userId", "eventId"])
  
}); 