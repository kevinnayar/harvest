import { TypeStatus } from './entityTypes';

export type TypePlant = {
  plantId: string;
  plantName: string;
  plantCategory: string;
  userId: string;
  status: TypeStatus;
  datePlanted: string;
  dateCreated: string;
};

