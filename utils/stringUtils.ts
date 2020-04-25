import { TypeMonth } from '../types/baseTypes';

export function getMonthToIndex(month: TypeMonth): number {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months.findIndex(m => m === month);
}

export function getIndexToMonth(index: number, abbreviated?: boolean): string {
  if (index < 0 || index > 11) throw new Error('Unexpected: getIndexToMonth() index out of range');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[index];
  return abbreviated ? month.substring(0, 3) : month;
}

