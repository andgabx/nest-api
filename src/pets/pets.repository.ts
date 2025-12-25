import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetResponseDto } from './dto/pet-response.dto';

@Injectable()
export class PetsRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    ownerId: number,
    createPetDto: CreatePetDto,
  ): Promise<PetResponseDto> {
    const { birthDate, ...rest } = createPetDto;

    const data = {
      ...rest,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      owner: {
        connect: { id: ownerId },
      },
    };

    const pet = await this.prisma.pet.create({
      data,
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    return pet as PetResponseDto;
  }

  async findAll(): Promise<PetResponseDto[]> {
    const pets = await this.prisma.pet.findMany({
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    return pets as PetResponseDto[];
  }

  async findOne(id: number): Promise<PetResponseDto | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        owner: true,
        tutors: true,
      },
    });

    return pet as PetResponseDto | null;
  }

  async update(
    id: number,
    updatePetDto: UpdatePetDto,
  ): Promise<PetResponseDto> {
    const data: Record<string, unknown> = {
      ...updatePetDto,
    };

    if (updatePetDto.birthDate) {
      data.birthDate = new Date(updatePetDto.birthDate);
    }

    const pet = await this.prisma.pet.update({
      where: { id },
      data,
    });

    return pet as PetResponseDto;
  }

  async remove(id: number): Promise<PetResponseDto> {
    const pet = await this.prisma.pet.delete({
      where: { id },
    });

    return pet as PetResponseDto;
  }

  async addTutor(petId: number, tutorId: number): Promise<PetResponseDto> {
    const pet = await this.prisma.pet.update({
      where: { id: petId },
      data: {
        tutors: {
          connect: { id: tutorId },
        },
      },
      include: {
        tutors: true,
      },
    });

    return pet as PetResponseDto;
  }

  async removeTutor(petId: number, tutorId: number): Promise<PetResponseDto> {
    const pet = await this.prisma.pet.update({
      where: { id: petId },
      data: {
        tutors: {
          disconnect: { id: tutorId },
        },
      },
    });

    return pet as PetResponseDto;
  }
}
