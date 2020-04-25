import { convertSqlToEntity } from './entityUtils';

describe('entityUtils.test.ts', () => {
  test('convertSqlToEntity', () => {
    expect(
      convertSqlToEntity('TypeEntityUser', {
        type: 'TypeEntityUser',
        id: 'a',
        user_name: 'b',
        status: 'enabled',
        date_created: '2020-04-19 16:27:29.864',
        image_url: 'c',
      }),
    ).toEqual({
      type: 'TypeEntityUser',
      id: 'a',
      userName: 'b',
      status: 'enabled',
      dateCreated: 1587331649864,
      imageUrl: 'c',
    });
    expect(
      convertSqlToEntity('TypeEntityPlant', {
        type: 'TypeEntityPlant',
        id: 'a',
        user_id: 'b',
        plant_name: 'c',
        category: 'd',
        status: 'enabled',
        date_created: '2020-04-19 16:27:29.864',
        date_planted: '2020-04-19 16:27:29.864',
        image_url: 'e',
      }),
    ).toEqual({
      type: 'TypeEntityPlant',
      id: 'a',
      userId: 'b',
      plantName: 'c',
      category: 'd',
      status: 'enabled',
      dateCreated: 1587331649864,
      datePlanted: 1587331649864,
      imageUrl: 'e',
    });
  });
  expect(
    convertSqlToEntity('TypeEntityZone', {
      type: 'TypeEntityZone',
      id: 'a',
      zone: 'b',
      zipcode: 'c',
      t_range: 'd',
      first_frost_day: 1,
      first_frost_month: 2,
      last_frost_day: 3,
      last_frost_month: 4,
    }),
  ).toEqual({
    type: 'TypeEntityZone',
    id: 'a',
    zone: 'b',
    zipcode: 'c',
    tRange: 'd',
    firstFrostDay: 1,
    firstFrostMonth: 2,
    lastFrostDay: 3,
    lastFrostMonth: 4,
  });
});
