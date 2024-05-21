import { BasicUserDto } from './basic-user.dto';

export interface AnnouncementDto {
  id: number;
  date: Date; // Use Date type for timestamps
  title: string;
  message: string;
  author: BasicUserDto;
}
