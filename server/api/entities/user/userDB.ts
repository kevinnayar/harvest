import { IDatabase } from 'pg-promise';

export async function dbGetUserById(db: IDatabase<{}, any>, userId: string): Promise<Object[]> {
  return db.any(
    `
    SELECT
      *
    FROM
      users
    WHERE
      id = $[userId]
    `,
    { userId },
  );
}

export async function dbGetPlantsByUserId(db: IDatabase<{}, any>, userId: string): Promise<Object[]> {
  return db.any(
    `
    SELECT
      *
    FROM
      plants
    WHERE
      user_id = $[userId]
    `,
    { userId },
  );
}
