import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { Client } from 'pg';

async function dbDropTablesAll(pgClient: Client, rebuildZipcodes: boolean): Promise<void> {
  try {
    const statements = [
      'DROP TABLE IF EXISTS users;',
      'DROP TABLE IF EXISTS plants;',
      'DROP TABLE IF EXISTS zones;',
      ...(rebuildZipcodes ? ['DROP TABLE IF EXISTS zones_zipcodes;'] : []),
    ];

    for (const statement of statements) {
      if (statement.length > 3) {
        await pgClient.query(statement);
      }
    }
  } catch (err) {
    console.error(`Failed: dbDropTablesAll: ${err}`);
    throw err;
  }
}

async function dbCreateTablesAll(pgClient: Client): Promise<void> {
  try {
    const sql = await fs.readFile('./server/dbTools/index.pgsql', { encoding: 'UTF-8' });
    const statements: string[] = sql.split(/;\s*$/m);

    for (const statement of statements) {
      if (statement.length > 3) {
        await pgClient.query(statement);
      }
    }
  } catch (err) {
    console.error(`Failed: dbCreateTablesAll: ${err}`);
    throw err;
  }
}

async function dbBuildTableUsers(pgClient: Client, now: string): Promise<void> {
  try {
    const query = `
      INSERT INTO users (id, user_name, status, date_created)
      VALUES
        ('user_1', 'John Doe', 'enabled', ${now}),
        ('user_2', 'Jane Doe', 'enabled', ${now})
      ;
    `;
    await pgClient.query(query);
  } catch (err) {
    console.error(`Failed: dbBuildTableUsers: ${err}`);
    throw err;
  }
}

async function dbBuildTablePlants(pgClient: Client, now: string): Promise<void> {
  try {
    const query = `
      INSERT INTO plants (id, plant_name, category, user_id, status, date_planted, date_created)
      VALUES 
        ('plant_1', 'cilantro', 'herb', 'user_1', 'enabled', ${now}, ${now}),
        ('plant_2', 'arugula', 'vegetable', 'user_1', 'enabled', ${now}, ${now}),
        ('plant_3', 'apple', 'fruit', 'user_2', 'enabled', ${now}, ${now})
      ;
    `;
    await pgClient.query(query);
  } catch (err) {
    console.error(`Failed: dbBuildTablePlants: ${err}`);
    throw err;
  }
}

type TypeParsedZone = {
  title: string,
  description: string,
  temperature: string[],
  planting: string,
  vegetables: string[],
  fruit_trees: string[],
  herbs: string[],
};

function quotedStringArray(value: string): string {
  return `'${value}'`;
}

async function dbBuildTableZones(pgClient: Client): Promise<void> {
  try {
    const file = await fs.readFile('./data/zones.json', { encoding: 'UTF-8' });
    const json = JSON.parse(file);

    for (let [id, value] of Object.entries(json)) {
      // @ts-ignore
      const data: TypeParsedZone = value;
      const {
        title,
        description,
        planting,
        temperature,
        vegetables,
        fruit_trees: fruitTrees,
        herbs,
      } = data;

      const query = `
        INSERT INTO 
          zones (id, zone, title, description, planting, temperature, vegetables, fruit_trees, herbs)
        VALUES
          (
            'zone_${id}a',
            '${id}a',
            '${title}a',
            '${description}',
            '${planting}',
            ARRAY[${temperature.map(quotedStringArray)}],
            ARRAY[${vegetables.map(quotedStringArray)}],
            ARRAY[${fruitTrees.map(quotedStringArray)}],
            ARRAY[${herbs.map(quotedStringArray)}]
          ),
          (
            'zone_${id}b',
            '${id}b',
            '${title}b',
            '${description}',
            '${planting}',
            ARRAY[${temperature.map(quotedStringArray)}],
            ARRAY[${vegetables.map(quotedStringArray)}],
            ARRAY[${fruitTrees.map(quotedStringArray)}],
            ARRAY[${herbs.map(quotedStringArray)}]
          )
        ;
      `;
      await pgClient.query(query);
    }
  } catch (err) {
    console.error(`Failed: dbBuildTableZones: ${err}`);
    throw err;
  }
}

async function dbBuildTableZonesZipcodes(pgClient: Client): Promise<void> {
  try {
    const file = await fs.readFile('./data/phzm.json', { encoding: 'UTF-8' });
    const json = JSON.parse(file);
    const zipcodes = Object.keys(json);

    for (const zipcode of zipcodes) {
      const item = json[zipcode];
      const query = `
      INSERT INTO 
        zones_zipcodes (id, zipcode, zone, t_range)
      VALUES
        ('zipcode_${item.zipcode}', '${item.zipcode}', '${item.zone}', '${item.tRange}')
      ;
    `;
      await pgClient.query(query);
    }
  } catch (err) {
    console.error(`Failed: dbBuildTableZonesZipcodes: ${err}`);
    throw err;
  }
}

async function main(_rebuildZipcodes?: string): Promise<void> {
  dotenv.config();
  const pgClient: Client = new Client();
  const rebuildZipcodes = Boolean(_rebuildZipcodes);
  const now = `to_timestamp(${Date.now()} / 1000.0)`;

  try {
    await pgClient.connect();

    await dbDropTablesAll(pgClient, rebuildZipcodes);
    await dbCreateTablesAll(pgClient);

    await dbBuildTableUsers(pgClient, now);
    await dbBuildTablePlants(pgClient, now);
    await dbBuildTableZones(pgClient);
    if (rebuildZipcodes) await dbBuildTableZonesZipcodes(pgClient);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await pgClient.end();
  }
}

main(process.env.REBUILD_ZIPCODES)
  .then(() => console.log('DB INIT: finished'))
  .catch((err) => console.error(`DB INIT: finished with errors: ${err}`));



