import { IDatabase } from 'pg-promise';


export async function dbGetZoneByZipcode(db: IDatabase<{}, any>, zipcode: string): Promise<Object[]> {
  return db.any(
    `
    SELECT
      zones_zipcodes.id, zones_zipcodes.zipcode, zones_zipcodes.zone, zones_zipcodes.t_range,
      zones.first_frost_day, zones.first_frost_month, zones.last_frost_day, zones.last_frost_month
    FROM zones_zipcodes
    INNER JOIN zones ON zones.zone = zones_zipcodes.zone
    WHERE zones_zipcodes.zipcode = $[zipcode];
    `,
    { zipcode },
  );
}


