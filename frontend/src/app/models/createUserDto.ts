export interface createUserDto {
    companyId: number,
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    admin: boolean; // This was previously added
  }