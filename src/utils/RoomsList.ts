import { Room } from '../types/Room';
import { RoomEnum } from '../types/RoomEnum';

export const rooms: Room[] = [
  { id: RoomEnum.Conf, title: 'Конференц' },
  { id: RoomEnum.Mans, title: 'Мансарда' },
  { id: RoomEnum.Nova, title: 'Новацька' },
  { id: RoomEnum.Patr, title: 'Патронів' },
  { id: RoomEnum.Pidv, title: 'Підвал' },
  { id: RoomEnum.Ptas, title: 'Пташача' },
  { id: RoomEnum.Yuna, title: 'Юнацька' },
];
