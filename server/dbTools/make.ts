import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { Client } from 'pg';

async function make(): Promise<void> {
  dotenv.config();
  const pgClient: Client = new Client();

  try {
    await pgClient.connect();

    const sql = await fs.readFile('./server/dbTools/make.pgsql', { encoding: 'UTF-8' });
    const statements: string[] = sql.split(/;\s*$/m);

    for (const statement of statements) {
      if (statement.length > 3) {
        await pgClient.query(statement);
      }
    }

    // const file = await fs.readFile('./data/phzm.json', { encoding: 'UTF-8' });
    // const json = JSON.parse(file);
    // const zipcodes = Object.keys(json);
    // for (const zipcode of zipcodes) {
    //   const item = json[zipcode];
    //   const query = `
    //     INSERT INTO 
    //       plant_zones (id, zipcode, zone, t_range)
    //     VALUES
    //       ('${item.zipcode}', '${item.zipcode}', '${item.zone}', '${item.tRange}');
    //   `;
    //   await pgClient.query(query);
    // }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await pgClient.end();
  }
}

make()
  .then(() => console.log('DB MAKE: finished'))
  .catch((err) => console.log(`DB MAKE: finished with errors: ${err}`));
