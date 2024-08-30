import { formatDateToGoogleCalendar } from '@/utils'
import { auth, clerkClient } from '@clerk/nextjs/server'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ message: 'User not found' })
  }

  const { summary, description, date } = await request.json()
  // Get the OAuth access token for the user
  const provider = 'oauth_google'

  const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId, provider)

  const accessToken = clerkResponse.data[0].token

  // Use the accessToken to interact with the Google Calendar API
  // const eventObj = {
  //   summary: summary,
  //   description: description,
  //   start: {
  //     dateTime: formatDateToGoogleCalendar(date),
  //     timeZone: 'GB',
  //   },
  //   end: {
  //     dateTime: formatDateToGoogleCalendar(date),
  //     timeZone: 'GB',
  //   },
  //   location: '800 Howard St., San Francisco, CA 94103',
  // };

  const eventObj = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2024-08-31T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2024-08-31T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  const createEvent = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(eventObj),
  }).then((response) => {
    console.log(response)
    return response
  }).catch((error) => {
    console.log(error)
    throw NextResponse.json({ status: 400 })
  })

  return createEvent
  // return NextResponse.json({ message: createEvent })
}