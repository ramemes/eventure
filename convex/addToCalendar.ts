// import { action, internalQuery } from "./_generated/server";
// import { v } from "convex/values";
// import { internal } from "./_generated/api";
// import axios from "axios";
// import { formatDateToGoogleCalendar } from "../utils"

// import { clerkClient } from '@clerk/nextjs/server'

// export const addToCalendar = action({
//   args: { eventId: v.id("events")},
//   handler: async (ctx, args) => {
//     const event = await ctx.runQuery(internal.addToCalendar.getEvent, {
//       eventId: args.eventId
//     })

//     const identity = await ctx.auth.getUserIdentity();
    

//     if (!identity) {
//       throw new Error("Unauthorized");
//     }

//     if (!event) {
//       throw new Error("Event not found")
//     }

//     const provider = 'oauth_google'

//     const clerkResponse: any = await clerkClient().users.getUserOauthAccessToken(
//       identity.subject, 
//       provider
//     )

//     const accessToken = clerkResponse[0].token

//     const eventObj: any = {
//       summary: event.title,
//       description: event.description,
//       start: {
//         dateTime: formatDateToGoogleCalendar(event.date) ,
//         timeZone: 'GB',
//       },
//       end: {
//         dateTime: formatDateToGoogleCalendar(event.date),
//         timeZone: 'GB',
//       },
//       location: '800 Howard St., San Francisco, CA 94103',
//     };

//     const calendarEvent = await axios.post(
//       'https://www.googleapis.com/calendar/v3/calendars/calendarId/events', 
//       JSON.stringify(eventObj), 
//       {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//       }
//     })

//     return calendarEvent
//   },
// });

// export const getEvent = internalQuery({
//   args: {
//     eventId: v.id("events")
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.get(args.eventId)
//   }
// })