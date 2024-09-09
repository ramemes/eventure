import { v } from "convex/values"; 
import { mutation, query } from "./_generated/server";
import { getUserEventTickets } from "./helperFunctions";

export const addTicket = mutation({
  args: {
    eventId: v.id("events"),
  }, 
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }

    const tickets = await getUserEventTickets(ctx, userId, args.eventId)

    if (tickets.length) {
      throw new Error("User is already attending this event.")
    }

    const ticketId = await ctx.db.insert("tickets", {
      eventId: args.eventId,
      userId
    })

    return ticketId
  }
})

export const isAttending = query({
  args: {
    eventId: v.id("events")
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }
    const tickets = await getUserEventTickets(ctx, userId, args.eventId)

    return tickets.length ? tickets[0]._id : false

  }
})

export const removeTicket = mutation({
  args: {
    eventId: v.id("events"),
  }, 
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }
    const tickets = await getUserEventTickets(ctx, userId, args.eventId)

    if (!tickets) {
      throw new Error("User is not attending event.")
    }

    await ctx.db.delete(tickets[0]._id)
  }
})


export const getUserTickets = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }  
    const userTickets = await ctx.db.query("tickets")
      .withIndex("by_user", (q) => 
        q.eq("userId", userId)
      )
      .order("desc")
      .collect()
    
    return userTickets
  }
})

export const getTicket = query({
  args: {
    ticketId: v.id("tickets")
  },
  handler: async (ctx, args) => {

    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }  

    return await ctx.db.get(args.ticketId)
  }
})


export const getTicketEvent = query({
  args: {
    ticketId: v.id("tickets")
  },
  handler: async (ctx, args) => {

    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }  

    const ticket = await ctx.db.get(args.ticketId)

    if (!ticket) {
      return null
    }

    const event = await ctx.db.get(ticket.eventId)

    return {...ticket, event}

  }
})


//delete ticket function

export const deleteTicket = mutation({
  args: {
    ticketId: v.id("tickets")
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }

    const ticket = await ctx.db.get(args.ticketId)

    if (!ticket) {
      return null
    }

    if (userId !== ticket?.userId) {
      return null
    }

    await ctx.db.delete(args.ticketId)
  }
})


export const addGoogleEvent = mutation({
  args: {
    ticketId: v.id("tickets"),
    googleEventId: v.string()
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }
    const ticket = await ctx.db.get(args.ticketId)

    if (!ticket) {
      return null
    }

    if (userId !== ticket?.userId) {
      return null
    }

    await ctx.db.patch(args.ticketId, 
      {googleEventId: args.googleEventId}
    )
  }
})

export const removeGoogleEvent = mutation({
  args: {
    ticketId: v.id("tickets"),
    // googleEventId: v.string()
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject
    if (!userId) {
      return null
    }
    const ticket = await ctx.db.get(args.ticketId)

    if (!ticket) {
      return null
    }

    if (userId !== ticket?.userId) {
      return null
    }

    await ctx.db.patch(args.ticketId, 
      {googleEventId: undefined}
    )
  }
})