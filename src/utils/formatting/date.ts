import {
  format,
  parseISO,
  isValid,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  isWithinInterval,
} from "date-fns";

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "Invalid date";
  }
  return format(date, "MMM d, yyyy");
}

export function formatShortDate(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "Invalid";
  }
  return format(date, "MM/dd/yy");
}

export function formatMonthYear(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "Invalid";
  }
  return format(date, "MMM yyyy");
}

export function formatInputDate(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "";
  }
  return format(date, "yyyy-MM-dd");
}

export function parseDate(dateString: string): Date | null {
  const date = parseISO(dateString);
  return isValid(date) ? date : null;
}

export function isValidDateString(dateString: string): boolean {
  const date = parseISO(dateString);
  return isValid(date);
}

export function getTodayString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function getMonthRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

export function getYearRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfYear(date),
    end: endOfYear(date),
  };
}

export function getLast6MonthsRange(): { start: Date; end: Date } {
  const now = new Date();
  return {
    start: startOfMonth(subMonths(now, 5)),
    end: endOfMonth(now),
  };
}

export function isDateInRange(
  dateString: string,
  startDate: string | null,
  endDate: string | null
): boolean {
  const date = parseISO(dateString);
  if (!isValid(date)) return false;

  if (!startDate && !endDate) return true;

  const start = startDate ? parseISO(startDate) : new Date(0);
  const end = endDate ? parseISO(endDate) : new Date(8640000000000000);

  if (!isValid(start) || !isValid(end)) return true;

  return isWithinInterval(date, { start, end });
}

export function getMonthKey(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) return "invalid";
  return format(date, "yyyy-MM");
}
