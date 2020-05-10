import { IDatabase } from 'pg-promise';
import { TypeEntityPlant } from '../../../../types/entityTypes';

export async function dbGetPlantById(db: IDatabase<{}, any>, plantId: string): Promise<Object[]> {
  return db.any(
    `
    SELECT
      *
    FROM
      plants
    WHERE
      id = $[plantId]
    `,
    { plantId },
  );
}

export async function dbCreateNewPlant(db: IDatabase<{}, any>, plant: TypeEntityPlant): Promise<boolean> {
  const { id, plantName, category, userId, status, dateCreated, datePlanted } = plant;
  return db
    .one(
      `
      INSERT INTO plants (id, plant_name, category, user_id, status, date_created ${
        datePlanted !== undefined ? ', date_planted' : ''
      })
      VALUES ($1, $2, $3, $4, $5, to_timestamp($6) ${datePlanted !== undefined ? ', to_timestamp($7)' : ''})
      RETURNING id;
    `,
      [id, plantName, category, userId, status, `${dateCreated}`, ...datePlanted !== undefined ? [`${datePlanted}`]: []],
    )
    .then((_d) => true)
    .catch((err) => {
      console.log(`DB Error: ${err}`);
      return false;
    });
}