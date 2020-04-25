type TypeStatus = 'enabled' | 'disabled';

export type TypeEntityUser = {
  type: 'TypeEntityUser';
  id: string;
  userName: string;
  status: TypeStatus,
  dateCreated: number;
  imageUrl?: string;
};

export type TypeEntityPlant = {
  type: 'TypeEntityPlant';
  id: string;
  userId: string;
  plantName: string;
  category: string;
  status: TypeStatus;
  dateCreated: number;
  datePlanted?: number;
  imageUrl?: string;
};

export type TypeEntityZone = {
  type: 'TypeEntityZone';
  id: string;
  zipcode: string;
  zone: string;
  tRange: string;
  firstFrostDay: number;
  firstFrostMonth: number;
  lastFrostDay: number;
  lastFrostMonth: number;
};

export type TypeEntity = TypeEntityUser | TypeEntityPlant | TypeEntityZone;
export type TypeEntityType = Pick<TypeEntity, 'type'>['type'];