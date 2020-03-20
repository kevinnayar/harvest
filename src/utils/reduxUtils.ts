import { TypeApiXferStatus } from '../types/baseTypes';

export function apiErrorToString(error: string | { message: string }): string {
  if (typeof error === 'object' && error.message && typeof error.message === 'string') {
    return error.message;
  }
  // @ts-ignore: implicitly a string
  return error;
}

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
    error: apiErrorToString(error),
  };
}

