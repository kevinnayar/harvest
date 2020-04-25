import { IDatabase } from 'pg-promise';

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
