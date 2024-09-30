import { formatDateToGoogleCalendar } from '@/utils'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ message: 'User not found' })
  }

  const { summary, description, startTime, endTime } = await request.json()

  // Get the OAuth access token for the user
  const provider = 'oauth_google'

  const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId, provider)

  const accessToken = clerkResponse.data[0].token
  
  // Use the accessToken to interact with the Google Calendar API

  const eventObj = {
    summary: summary,
    description: description,
    start: {
      dateTime: formatDateToGoogleCalendar(startTime),
      timeZone: 'GB',
    },
    end: {
      dateTime: formatDateToGoogleCalendar(endTime),
      timeZone: 'GB',
    },
  };


  const createEvent = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(eventObj),
  })    
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    return NextResponse.json({ message: data })
  })
  .catch((error) => {
    return NextResponse.json({ status: 400, error: error })
  })

  return createEvent

}


export async function DELETE(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ message: 'User not found' })
  }

  const { calendarEventId } = await request.json()

  // Get the OAuth access token for the user
  const provider = 'oauth_google'

  const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId, provider)

  const accessToken = clerkResponse.data[0].token


  // Use the accessToken to interact with the Google Calendar API



  const deleteEvent = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarEventId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    // body: JSON.stringify(eventObj),
  })    
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    return NextResponse.json({ message: data })
  })
  .catch((error) => {
    return NextResponse.json({ status: 400, error: error })
  })

  return deleteEvent

}