import {
  TypeUserEntity,
  TypePlantEntity,
  TypePlantZoneEntity,
  TypeEntityType,
  TypeEntity,
} from '../types/entityTypes';

export function apiErrorToString(error: string | { message: string }): string {
  return typeof error === 'string' ? error : error.message;
}

export function stringOrThrow(value: any, message: string): string {
  if (typeof value === 'string') return value;
  throw new Error(message);
}

export function strictStringOrThrow(value: any, message: string): string {
  if (typeof value === 'string' && value !== '') return value;
  throw new Error(message);
}

export function predicateOrThrow<T>(predicateFunc: (value: T) => boolean, value: T, message: string): T {
  if (predicateFunc(value)) return value;
  throw new Error(message);
}

function convertUserSqlToEntity(entity: any): TypeUserEntity {
  try {
    return {
      type: 'TypeUserEntity',
      id: entity.id,
      userName: entity.user_name,
      imageUrl: entity.image_url || undefined,
      dateCreated: entity.date_created || undefined,
    };
  } catch (err) {
    throw new Error(err);
  }
}

function convertPlantSqlToEntity(entity: any): TypePlantEntity {
  try {
    return {
      type: 'TypePlantEntity',
      id: entity.id,
      userId: entity.user_id,
      plantName: entity.plant_name,
      imageUrl: entity.image_url || undefined,
      dob: entity.dob || undefined,
      dateCreated: entity.date_created || undefined,
    }
  } catch (err) {
    throw new Error(err);
  }
}

function convertPlantZoneSqlEntity(entity: any): TypePlantZoneEntity {
  try {
    const { id, zipcode, zone } = entity;
    return {
      type: 'TypePlantZoneEntity',
      id,
      zipcode,
      zone,
      tRange: entity.t_range,
    };
  } catch (err) {
    throw new Error(err);
  }
}

export function convertSqlToEntity(entityType: TypeEntityType, entity: any): TypeEntity {
  switch (entityType) {
    case 'TypeUserEntity':
      return convertUserSqlToEntity(entity);
    case 'TypePlantEntity':
      return convertPlantSqlToEntity(entity);
    case 'TypePlantZoneEntity':
      return convertPlantZoneSqlEntity(entity);
    default:
      throw new Error(`convertSqlToEntity: unexpected entity type: ${entityType}`);
  }
}