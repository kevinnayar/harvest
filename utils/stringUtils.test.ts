import {
  getMonthToIndex,
  getIndexToMonth,
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
});