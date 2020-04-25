import {
  apiFormatError,
  stringOrThrow,
  strictStringOrThrow,
  numberOrThrow,
  predicateOrThrow,
} from './apiUtils';

describe('apiUtils.test.ts', () => {
  const err: string = 'error';
  const errObj: { message: string } = { message: err };

  test('apiFormatError', () => {
    expect(apiFormatError(err)).toEqual(err);
    expect(apiFormatError(errObj)).toEqual(err);
  });

  test('stringOrThrow', () => {
    expect(stringOrThrow('a', err)).toEqual('a');
    expect(stringOrThrow('', err)).toEqual('');
    expect(() => stringOrThrow(1, err)).toThrow(err);
  });

  test('strictStringOrThrow', () => {
    expect(strictStringOrThrow('a', err)).toEqual('a');
    expect(() => strictStringOrThrow('', err)).toThrow(err);
    expect(() => strictStringOrThrow(1, err)).toThrow(err);
  });

  test('numberOrThrow', () => {
    expect(numberOrThrow(0, err)).toEqual(0);
    expect(numberOrThrow(1, err)).toEqual(1);
    expect(numberOrThrow(9007199254740991, err)).toEqual(9007199254740991);
    expect(() => numberOrThrow(9007199254740992, err)).toThrow(err);
    expect(() => numberOrThrow('foo', err)).toThrow(err);
    expect(() => numberOrThrow(undefined, err)).toThrow(err);
    expect(() => numberOrThrow({}, err)).toThrow(err);
    expect(() => numberOrThrow([], err)).toThrow(err);
  });

  test('predicateOrThrow', () => {
    const isThreeLetters = (value: string) => value.length === 3;
    expect(predicateOrThrow(isThreeLetters, 'foo', err)).toEqual('foo');
    expect(predicateOrThrow(isThreeLetters, 'bar', err)).toEqual('bar');
    expect(() => predicateOrThrow(isThreeLetters, 'fo', err)).toThrow(err);
    expect(() => predicateOrThrow(isThreeLetters, 'fooo', err)).toThrow(err);

    const isZipcode = (value: number) => typeof value === 'number' && !Number.isNaN(value) && value.toString().length === 5;
    expect(predicateOrThrow(isZipcode, 78745, err)).toEqual(78745);
    expect(predicateOrThrow(isZipcode, 90210, err)).toEqual(90210);
    expect(() => predicateOrThrow(isZipcode, 1, err)).toThrow(err);
    expect(() => predicateOrThrow(isZipcode, 111111, err)).toThrow(err);
  });
});
