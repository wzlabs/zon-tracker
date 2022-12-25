import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  userId: string;
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  salt: string;

  @IsNotEmpty()
  firstName: string;
  lastName: string;
  groups?: string;
  userPermissions?: string;
  isStaff: boolean;
  isActive: boolean;
  isSuperuser: boolean;
  verifiedEmail: boolean;
  lastLogin?: number;
  dateJoined: number;
  loginProvider?: string;
}
