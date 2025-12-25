import { ApiProperty } from '@nestjs/swagger';
import { Species } from '@prisma/client';

export class OwnerResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class TutorResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class PetResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Species })
  species: Species;

  @ApiProperty({ required: false })
  breed?: string | null;

  @ApiProperty({ required: false })
  birthDate?: Date | null;

  @ApiProperty({ required: false })
  weight?: number | null;

  @ApiProperty()
  pedigree: boolean;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({ type: OwnerResponseDto, required: false })
  owner?: OwnerResponseDto;

  @ApiProperty({ type: [TutorResponseDto], required: false })
  tutors?: TutorResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
