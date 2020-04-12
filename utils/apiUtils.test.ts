import { apiErrorToString } from './apiUtils';

describe('apiUtils.test.ts', () => {
  test('apiErrorToString', () => {
    const errorStr: string = 'error';
    const errorObj: { message: string } = { message: errorStr };

    expect(apiErrorToString(errorStr)).toEqual(errorStr);
    expect(apiErrorToString(errorObj)).toEqual(errorStr);
  });
});

