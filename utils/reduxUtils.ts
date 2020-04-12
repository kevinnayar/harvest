import { apiErrorToString } from './apiUtils';
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
    error: apiErrorToString(error),
  };
}

