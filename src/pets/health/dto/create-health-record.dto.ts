import { ApiProperty } from '@nestjs/swagger';
import { RecordType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHealthRecordDto {
  @ApiProperty({ enum: RecordType, example: RecordType.VACCINE })
  @IsEnum(RecordType)
  type: RecordType;

  @ApiProperty({ example: 'Rabies Vaccine - 1st Dose' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '2025-10-20T10:00:00Z',
    description: 'Date of the event',
  })
  @IsDateString()
  date: string; 

  @ApiProperty({
    example: '2026-10-20T10:00:00Z',
    required: false,
    description: 'Reminder for next dose/visit',
  })
  @IsDateString()
  @IsOptional()
  nextDueDate?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ example: 'Dr. Silva', required: false })
  @IsString()
  @IsOptional()
  doctor?: string;

  @ApiProperty({ example: 'PetShop Boa Viagem', required: false })
  @IsString()
  @IsOptional()
  clinic?: string;

  @ApiProperty({ example: 'Pet had a mild fever afterwards', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
