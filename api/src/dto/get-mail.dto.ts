import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetMailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
