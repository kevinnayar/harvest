export function timeGetDateToUtc(date: Date): number {
  const time = date.getTime();
  return Math.floor(time / 1000);
}

export function timeGetNowToUtc(): number {
  return Math.floor(Date.now() / 1000);
}

export function timeTrimUtc(time: number): number {
  return Math.floor(time / 1000);
}
