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
    description: 'Nome do pet',
    example: 'Rex',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Espécie do animal',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enum: Species,
    example: Species.DOG,
  })
  @IsEnum(Species)
  species: Species;

  @ApiProperty({
    description: 'Raça do animal (opcional)',
    example: 'Labrador',
    required: false,
  })
  @IsString()
  @IsOptional()
  breed?: string;

  @ApiProperty({
    description: 'Data de nascimento (ISO 8601)',
    example: '2020-05-15T00:00:00.000Z',
    required: false,
  })
  @IsISO8601() // Valida se é uma string de data válida
  @IsOptional()
  birthDate?: string; // Recebemos como string do JSON, o Prisma converte se configurado ou convertemos no Service

  @ApiProperty({
    description: 'Peso atual em Kg',
    example: 12.5,
    required: false,
  })
  @IsNumber()
  @Min(0) // Não existe peso negativo
  @IsOptional()
  weight?: number;

  // NOTA: Não colocamos 'ownerId' aqui.
  // Boas práticas: O ownerId deve ser pego do token de autenticação (JWT) do usuário logado,
  // e não confiado no corpo da requisição.
}
