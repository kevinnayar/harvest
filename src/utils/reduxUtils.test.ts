import { apiErrorToString } from './reduxUtils';

describe('/src/utils/reduxUtils', () => {
  test('apiErrorToString', () => {
    const errorStr: string = 'error';
    const errorObj: { message: string } = { message: errorStr };

    expect(apiErrorToString(errorStr)).toEqual(errorStr);
    expect(apiErrorToString(errorObj)).toEqual(errorStr);
  });
});

