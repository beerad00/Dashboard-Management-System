import { BasicUserDto } from "./basic-user.dto";

export interface TeamDto {
    id: number;
    name: string;
    description: string;
    teammates: BasicUserDto[];
  }