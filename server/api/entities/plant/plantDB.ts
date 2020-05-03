import { IDatabase } from 'pg-promise';
import { TypePlant } from '../../../../types/plantTypes';

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

export async function dbCreateNewPlant(db: IDatabase<{}, any>, plant: TypePlant): Promise<boolean> {
  const { plantId, plantName, plantCategory, userId, status, datePlanted, dateCreated } = plant;
  return db
    .one(
      `
      INSERT INTO plants (id, plant_name, category, user_id, status, date_planted, date_created)
      VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($7))
      RETURNING id;
    `,
      [plantId, plantName, plantCategory, userId, status, datePlanted, dateCreated],
    )
    .then((_d) => true)
    .catch((err) => {
      console.log(`DB Error: ${err}`);
      return false;
    });
}