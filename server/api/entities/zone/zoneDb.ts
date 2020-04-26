import { IDatabase } from 'pg-promise';


export async function dbGetZoneByZipcode(db: IDatabase<{}, any>, zipcode: string): Promise<Object[]> {
  return db.any(
    `
    SELECT
      zones_zipcodes.id, zones_zipcodes.zipcode, zones_zipcodes.zone, zones_zipcodes.t_range,
      zones.id, zones.zone, zones.title, zones.description, zones.planting, zones.temperature, zones.vegetables, zones.fruit_trees, zones.herbs 
    FROM zones_zipcodes
    INNER JOIN zones ON zones.zone = zones_zipcodes.zone
    WHERE zones_zipcodes.zipcode = $[zipcode];
    `,
    { zipcode },
  );
}
