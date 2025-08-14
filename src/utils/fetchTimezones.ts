import type {Option} from '../components/Multiselect';
import {TIMEZONES_URL} from './constants';

export const fetchTimezones = async (): Promise<Option[]> => {
  const res = await fetch(TIMEZONES_URL);
  if (!res.ok) throw new Error('Failed to fetch timezones');
  const data: string[] = await res.json();

  return data.map(timezone => ({
    label: timezone,
    value: timezone,
  }));
};
