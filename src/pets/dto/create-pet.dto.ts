import { ApiProperty } from '@nestjs/swagger';
import { Species } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    description: 'Name of the pet',
    example: 'Rex',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Species of the pet',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enum: Species,
    example: Species.DOG,
  })
  @IsEnum(Species)
  species: Species;

  @ApiProperty({
    description: 'Breed of the pet (optional)',
    example: 'Labrador',
    required: false,
  })
  @IsString()
  @IsOptional()
  breed?: string;

  @ApiProperty({
    description: 'Birth date (ISO 8601)',
    example: '2020-05-15T00:00:00.000Z',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'Current weight in Kg',
    example: 12.5,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  weight?: number;
}
