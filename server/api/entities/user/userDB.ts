import { IDatabase } from 'pg-promise';
import { TypeUser } from '../../../../types/userTypes';

export async function dbCreateNewUser(db: IDatabase<{}, any>, user: TypeUser): Promise<boolean> {
  const { userId, firstName, lastName, status, role, email, confirmed, dateCreated } = user;
  return db.one(
    `
      INSERT INTO users (id, first_name, last_name, status, role, email, confirmed, date_created)
      VALUES ($1, $2, $3, $4, $5, $6, $7, to_timestamp($8))
      RETURNING id;
    `,
    [userId, firstName, lastName, status, role, email, confirmed, dateCreated],
  )
  .then((_d) => true)
  .catch((err) => {
    console.log(`DB Error: ${err}`);
    return false;
  });
}

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
