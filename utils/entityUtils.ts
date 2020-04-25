import {
  TypeEntityUser,
  TypeEntityPlant,
  TypeEntityZone,
  TypeEntityType,
  TypeEntity,
} from '../types/entityTypes';

function convertSqlToEntityUser(entity: any): TypeEntityUser {
  const { id, status } = entity;
  return {
    type: 'TypeEntityUser',
    id,
    userName: entity.user_name,
    status,
    dateCreated: new Date(entity.date_created).getTime(),
    imageUrl: entity.image_url || undefined,
  };
}

function convertSqlToEntityPlant(entity: any): TypeEntityPlant {
  const { id, category, status } = entity;
  return {
    type: 'TypeEntityPlant',
    id,
    userId: entity.user_id,
    plantName: entity.plant_name,
    category,
    status,
    dateCreated: new Date(entity.date_created).getTime(),
    datePlanted: entity.date_planted ? new Date(entity.date_created).getTime() : undefined,
    imageUrl: entity.image_url || undefined,
  };
}

function convertSqlToEntityZone(entity: any): TypeEntityZone {
  const { id, zipcode, zone } = entity;
  return {
    type: 'TypeEntityZone',
    id,
    zipcode,
    zone,
    tRange: entity.t_range,
    firstFrostDay: entity.first_frost_day,
    firstFrostMonth: entity.first_frost_month,
    lastFrostDay: entity.last_frost_day,
    lastFrostMonth: entity.last_frost_month,
  };
}

export function convertSqlToEntity(entityType: TypeEntityType, entity: any): TypeEntity {
  switch (entityType) {
    case 'TypeEntityUser':
      return convertSqlToEntityUser(entity);
    case 'TypeEntityPlant':
      return convertSqlToEntityPlant(entity);
    case 'TypeEntityZone':
      return convertSqlToEntityZone(entity);
    default:
      throw new Error(`convertSqlToEntity: unexpected entity type: ${entityType}`);
  }
}
