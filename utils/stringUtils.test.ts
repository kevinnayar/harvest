import {
  getMonthToIndex,
  getIndexToMonth,
  getGuid,
} from './stringUtils';

describe('stringUtils.test.ts', () => {
  test('getMonthToIndex', () => {
    expect(getMonthToIndex('January')).toEqual(0);
    expect(getMonthToIndex('December')).toEqual(11);
  });

  test('getIndexToMonth', () => {
    expect(getIndexToMonth(0)).toEqual('January');
    expect(getIndexToMonth(0, true)).toEqual('Jan');

    expect(getIndexToMonth(11)).toEqual('December');
    expect(getIndexToMonth(11, true)).toEqual('Dec');

    expect(() => getIndexToMonth(12)).toThrow('Unexpected: getIndexToMonth() index out of range');
    expect(() => getIndexToMonth(-1)).toThrow('Unexpected: getIndexToMonth() index out of range');
  });

  test('getGuid', () => {
    const guidRegex = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/;
    expect(getGuid('user')).toMatch(/user_/);
    expect(getGuid('plant')).toMatch(/plant_/);
    expect(getGuid()).toMatch(guidRegex);
  });
});