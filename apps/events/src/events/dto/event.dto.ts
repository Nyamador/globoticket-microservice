import { PickType } from '@nestjs/mapped-types';
import { IsDateString, IsString, IsUUID, IsUrl, isURL } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  slug: string;

  @IsDateString()
  date: Date;

  @IsUrl()
  imageURL: string;

  @IsUUID()
  organizerId: string;
}

export class EditEventDto extends PickType(CreateEventDto, [
  'name',
  'description',
  'location',
  'slug',
  'date',
] as const) {}
