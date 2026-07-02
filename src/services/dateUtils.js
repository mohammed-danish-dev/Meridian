import { store } from '../store/store';

const timezoneMap = {
  utc: 'UTC',
  pst: 'America/Los_Angeles',
  est: 'America/New_York',
  cet: 'Europe/Paris',
};

export const getUserTimezone = () => {
  try {
    const state = store.getState();
    const user = state.auth?.user;
    return user?.timezone || 'utc';
  } catch {
    return 'utc';
  }
};

export const formatDateInTimezone = (dateInput, formatPattern) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const timezoneKey = getUserTimezone();
  const timeZone = timezoneMap[timezoneKey] || 'UTC';

  try {
    if (formatPattern === 'yyyy-MM-dd HH:mm:ss') {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const parts = formatter.formatToParts(date);
      const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
      return `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second}`;
    }

    if (formatPattern === 'MMM dd, yyyy') {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
      return formatter.format(date);
    }
    return date.toLocaleString('en-US', { timeZone });
  } catch (error) {
    return date.toLocaleString('en-US');
  }
};

export const getLocalDateString = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const timezoneKey = getUserTimezone();
  const timeZone = timezoneMap[timezoneKey] || 'UTC';
  try {
    return date.toLocaleDateString('en-US', { timeZone });
  } catch {
    return date.toLocaleDateString();
  }
};

export const getLocalTimeString = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const timezoneKey = getUserTimezone();
  const timeZone = timezoneMap[timezoneKey] || 'UTC';
  try {
    return date.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit' });
  } catch {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
};
