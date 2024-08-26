export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp); // Convert to milliseconds

  // Get the full month name
  const month = date.toLocaleString('en-US', { month: 'long' });
  // Get the day of the month
  const day = date.getDate();
  // Get the full year
  const year = date.getFullYear();
  // Get the formatted time
  const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  });

  return `${month} ${day}, ${year} - ${time}`;
}

export function formatDateToString(date: Date, time: string) {

  const dateObj = new Date(date);

  // Define an array for days of the week and months to use in formatting
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  
  const correctedDate = new Date(Date.UTC(year, month, day));

  const dayOfWeek = daysOfWeek[correctedDate.getUTCDay()];
  const monthName = months[correctedDate.getUTCMonth()];
  const dayOfMonth = correctedDate.getUTCDate().toString().padStart(2, '0');
  const formattedTime = time || "00:00"; 
  const dateString = `${dayOfWeek}, ${dayOfMonth} ${monthName}, ${formattedTime}`
  return dateString
}

export function convertToTimestamp(dateStr: string): number {
    // Split the string into components
    const [dayOfWeek, day, month, time] = dateStr.split(/, | /); 
    const [hours, minutes] = time.split(':').map(Number);

    // Mapping of month names to their zero-based indices
    const monthsMap: { [key: string]: number } = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11,
    };

    // Assume a specific year if the year is not provided
    const year = new Date().getFullYear();

    // Get the month index from the monthsMap
    const monthIndex = monthsMap[month];

    // Create the Date object using the parsed components
    const date = new Date(Date.UTC(year, monthIndex, parseInt(day), hours, minutes));

    // Return the timestamp in milliseconds
    return date.getTime();
}

export function formatDateToGoogleCalendar(timestamp: number) {
  const date = new Date(timestamp);

  const pad = (num: any) => (num < 10 ? '0' + num : num);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // Get the timezone offset in minutes and convert it to hours and minutes
  const timezoneOffset = -date.getTimezoneOffset(); // Negative because getTimezoneOffset returns the difference in minutes between UTC and local time.
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);
  const offsetSign = timezoneOffset >= 0 ? '+' : '-';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

