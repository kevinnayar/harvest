import {
  TypeEntityUser,
  TypeEntityPlant,
  TypeEntityZone,
} from '../types/entityTypes';

export function convertSqlToEntityUser(entity: any): TypeEntityUser {
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

export function convertSqlToEntityPlant(entity: any): TypeEntityPlant {
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

export function convertSqlToEntityZone(entity: any): TypeEntityZone {
  const { id, zipcode, zone, title, description, planting, temperature, vegetables, herbs } = entity;
  return {
    type: 'TypeEntityZone',
    id,
    zipcode,
    zone,
    tRange: entity.t_range,
    title,
    description,
    planting,
    temperature,
    vegetables,
    fruitTrees: entity.fruit_trees,
    herbs,
  };
}