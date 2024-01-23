import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsUUID()
  eventId: string;

  @IsOptional()
  @IsUUID()
  userId: string;
}
