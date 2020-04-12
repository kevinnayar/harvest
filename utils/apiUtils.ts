import { TypeUserEntity } from '../types/userTypes';
import { TypePlantEntity } from '../types/plantTypes';
import { TypeEntityTypes, TypeEntity } from '../types/baseTypes';

export function apiErrorToString(error: string | { message: string }): string {
  if (typeof error === 'object' && error.message && typeof error.message === 'string') {
    return error.message;
  }
  // @ts-ignore: implicitly a string
  return error;
}

export function stringOrThrow(value: any, message: string): string {
  if (typeof value === 'string') return value;
  throw new Error(message);
}

export function strictStringOrThrow(value: any, message: string): string {
  if (typeof value === 'string' && value !== '') return value;
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

export function convertSqlToEntity(entityType: TypeEntityTypes, entity: any): TypeEntity {
  switch (entityType) {
    case 'TypeUserEntity':
      return convertUserSqlToEntity(entity);
    case 'TypePlantEntity':
      return convertPlantSqlToEntity(entity);
    default:
      throw new Error(`convertSqlToEntity: unexpected entity type: ${entityType}`);
  }
}
