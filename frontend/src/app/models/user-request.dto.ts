export interface UserRequestDto {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    admin: boolean; // Add this property if it's missing
  }