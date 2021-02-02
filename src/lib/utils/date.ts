export function getDate(year: number, month: number, day: number): Date {
  if (year <= 0) {
    throw new Error('Year should be larger than 0.');
  }
  if (month <= 0 || month > 12) {
    throw new Error('Month should be between 1 and 12.');
  }
  if (day <= 0 || day > 31) {
    throw new Error('Day should be between 1 and 31.');
  }

  return new Date(year, month - 1, day);
}

export function getDateString(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
