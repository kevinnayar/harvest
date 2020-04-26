import { 
  convertSqlToEntityUser,
  convertSqlToEntityPlant,
  convertSqlToEntityZone,
 } from './entityUtils';

describe('entityUtils.test.ts', () => {
  test('convertSqlToEntity', () => {
    expect(
      convertSqlToEntityUser({
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
      convertSqlToEntityPlant({
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
    convertSqlToEntityZone({
      type: 'TypeEntityZone',
      id: 'a',
      zone: 'b',
      zipcode: 'c',
      t_range: 'd',
      title: 's',
      description: 's',
      planting: 's',
      temperature: ['a', 'b'],
      vegetables: ['a', 'b'],
      fruit_trees: ['a', 'b'],
      herbs: ['a', 'b'],
    }),
  ).toEqual({
    type: 'TypeEntityZone',
    id: 'a',
    zone: 'b',
    zipcode: 'c',
    tRange: 'd',
    title: 's',
    description: 's',
    planting: 's',
    temperature: ['a', 'b'],
    vegetables: ['a', 'b'],
    fruitTrees: ['a', 'b'],
    herbs: ['a', 'b'],
  });
});
