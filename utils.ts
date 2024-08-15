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

