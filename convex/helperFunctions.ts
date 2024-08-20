import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";


// export async function isUserAttending(ctx: QueryCtx): Promise<Doc<"attendees">> {
//   // load user details using `ctx.auth` and `ctx.db`
// }


export const getUserEventTickets = async (ctx: QueryCtx | MutationCtx, userId: string, eventId: Id<"events">) => {
  const tickets = await ctx.db.query("tickets")
  .withIndex("by_user_event",  (q) => 
    q
      .eq("userId", userId)
      .eq("eventId", eventId)
  )
  .collect()

  return tickets
}