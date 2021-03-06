import { TypeApiXferStatus } from '../types/baseTypes';

export function apiXferInit(): TypeApiXferStatus {
  return {
    requested: false,
    succeeded: false,
    failed: false,
    error: null,
  };
}

export function apiXferRequested(): TypeApiXferStatus {
  return {
    requested: true,
    succeeded: false,
    failed: false,
    error: null,
  };
}

export function apiXferSucceeded(): TypeApiXferStatus {
  return {
    requested: false,
    succeeded: true,
    failed: false,
    error: null,
  };
}

export function apiXferFailed(error: string | { message: string }): TypeApiXferStatus {
  return {
    requested: false,
    succeeded: false,
    failed: true,
    error: apiFormatError(error),
  };
}

export function apiFormatError(error: string | { message: string }): string {
  return typeof error === 'object' && 'message' in error ? error.message.toString() : error;
}

export function apiResponseHandler(res: any) {
  const response = res.json();
  if ('status' in response && typeof response.status === 'number' && response.status !== 200) {
    throw apiFormatError(response);
  }
  return response;
}

export async function apiAuthenticatedPost(jwtToken: string, url: string, body: BodyInit) {
  const response = await fetch(url, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body,
  });
  return response;
}

export function stringOrThrow(value: any, message: string): string {
  if (typeof value === 'string') return value;
  throw new Error(message);
}

export function stringUndefinedOrThrow(value: any, message: string): void | string {
  if (value === undefined) return value;
  if (typeof value === 'string') return value;
  throw new Error(message);
}

export function strictStringOrThrow(value: any, message: string): string {
  if (typeof value === 'string' && value !== '') return value;
  throw new Error(message);
}

export function numberOrThrow(value: any, message: string): number {
  if (typeof value === 'number' && !Number.isNaN(value) && value <= Number.MAX_SAFE_INTEGER) return value;
  throw new Error(message);
}

export function predicateOrThrow<T>(predicateFunc: (value: T) => boolean, value: T, message: string): T {
  if (predicateFunc(value)) return value;
  throw new Error(message);
}

export function trueOrThrow(value: any,  message: string): boolean {
  if (typeof value === 'boolean' && value === true) return value;
  throw new Error(message);
}


