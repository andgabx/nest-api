import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Pet } from '@prisma/client';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(ownerId: number, createPetDto: CreatePetDto): Promise<Pet> {
    const { birthDate, ...rest } = createPetDto;

    const data: Prisma.PetCreateInput = {
      ...rest,
      birthDate: birthDate ? new Date(birthDate) : undefined,

      owner: {
        connect: { id: ownerId },
      },
    };

    return this.prisma.pet.create({
      data,
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany({
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOne(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({
      where: { id },
      include: {
        owner: true,
        tutors: true,
      },
    });
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const data: Prisma.PetUpdateInput = {
      ...updatePetDto,
      birthDate: updatePetDto.birthDate
        ? new Date(updatePetDto.birthDate)
        : undefined,
    };
    return this.prisma.pet.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Pet> {
    return this.prisma.pet.delete({
      where: { id },
    });
  }

  async addTutor(petId: number, tutorId: number): Promise<Pet> {
    return this.prisma.pet.update({
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
  }

  async removeTutor(petId: number, tutorId: number): Promise<Pet> {
    return this.prisma.pet.update({
      where: { id: petId },
      data: {
        tutors: {
          disconnect: { id: tutorId },
        },
      },
    });
  }
}
