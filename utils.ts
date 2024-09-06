export function formatTimestamp(timestamp: number, isEndDate: boolean): string {
  // Create a Date object using the timestamp (in milliseconds)
  const date = new Date(timestamp);

  // Get the full month name
  const month = date.toLocaleString('en-US', { month: 'short'});
  // Get the day of the month
  const day = date.getDate();
  // Get the full year
  const year = date.getFullYear();

  // Get the formatted time in the local time zone, ensuring no time shift
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Return the formatted string
  if (isEndDate) return `- ${time}`;

  return `${day} ${month} ${year}, ${time}`;
}



export function convertToUTCTimestamp(date: Date, time: string): number {
  // Extract hours and minutes from the time string
  const [hours, minutes] = time.split(':').map(Number);

  // Create a new Date object with the specified date and time in the local time zone
  const localDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      0,  // seconds
      0   // milliseconds
  );

  // Get the UTC timestamp directly from the local date and time
  const utcTimestamp = Date.UTC(
      localDateTime.getUTCFullYear(),
      localDateTime.getUTCMonth(),
      localDateTime.getUTCDate(),
      localDateTime.getUTCHours(),
      localDateTime.getUTCMinutes(),
      localDateTime.getUTCSeconds()
  );

  return utcTimestamp;
}






export function formatDateToGoogleCalendar(timestamp: number) {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Get the local time zone offset in minutes
  const timezoneOffset = date.getTimezoneOffset();

  // Adjust the date by the timezone offset (convert to local time)
  const localTime = new Date(date.getTime() - timezoneOffset * 60000);

  const pad = (num: number) => (num < 10 ? '0' + num : num);

  const year = localTime.getUTCFullYear();
  const month = pad(localTime.getUTCMonth() + 1); // Months are zero-indexed
  const day = pad(localTime.getUTCDate());
  const hours = pad(localTime.getUTCHours());
  const minutes = pad(localTime.getUTCMinutes());
  const seconds = pad(localTime.getUTCSeconds());

  // Format the local time to be compatible with Google Calendar's expected format
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
