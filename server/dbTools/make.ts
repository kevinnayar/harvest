import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { Client } from 'pg';

async function rebuildPlantZonesTable(pgClient: Client): Promise<void> {
  const file = await fs.readFile('./data/phzm.json', { encoding: 'UTF-8' });
  const json = JSON.parse(file);
  const zipcodes = Object.keys(json);

  for (const zipcode of zipcodes) {
    const item = json[zipcode];
    const query = `
      INSERT INTO 
        plant_zones (id, zipcode, zone, t_range)
      VALUES
        ('${item.zipcode}', '${item.zipcode}', '${item.zone}', '${item.tRange}');
    `;
    console.log(query);
    await pgClient.query(query);
  }
}

async function make(rebuild?: string): Promise<void> {
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
    
    if (Boolean(rebuild)) {
      await rebuildPlantZonesTable(pgClient);
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await pgClient.end();
  }
}

make(process.env.REBUILD)
  .then(() => console.log('DB MAKE: finished'))
  .catch((err) => console.log(`DB MAKE: finished with errors: ${err}`));