export type TypeUserEntity = {
  type: 'TypeUserEntity';
  id: string;
  userName: string;
  imageUrl?: string;
  dateCreated?: number;
};

export type TypePlantEntity = {
  type: 'TypePlantEntity';
  id: string;
  userId: string;
  plantName: string;
  imageUrl?: string;
  dob?: number;
  dateCreated?: number;
};

export type TypePlantZoneEntity = {
  type: 'TypePlantZoneEntity';
  id: number;
  zipcode: number;
  zone: string;
  tRange: string;
};

export type TypeEntity = TypeUserEntity | TypePlantEntity | TypePlantZoneEntity;
export type TypeEntityType = Pick<TypeEntity, 'type'>['type'];