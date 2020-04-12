import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { Client } from 'pg';

async function init(): Promise<void> {
  dotenv.config();
  const pgClient: Client = new Client();

  try {
    await pgClient.connect();

    const sql = await fs.readFile('./server/dbTools/init.pgsql', { encoding: 'UTF-8' });
    const statements: string[] = sql.split(/;\s*$/m);

    for (const statement of statements) {
      if (statement.length > 3) {
        await pgClient.query(statement);
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await pgClient.end();
  }
};

init()
  .then(() => console.log('DB INIT: finished'))
  .catch((err) => console.log(`DB INIT: finished with errors: ${err}`));
