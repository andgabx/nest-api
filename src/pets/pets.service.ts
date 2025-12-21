import { Injectable, NotFoundException } from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsService {
  // REMOVIDO: private readonly usersService: UsersService
  constructor(private readonly petsRepository: PetsRepository) {}

  async create(ownerId: number, createPetDto: CreatePetDto) {
    const data: Prisma.PetCreateInput = {
      ...createPetDto,
      birthDate: createPetDto.birthDate ? new Date(createPetDto.birthDate) : undefined,
      owner: {
        connect: { id: ownerId },
      },
    };

    return this.petsRepository.create(data);
  }

  async findAll() {
    return this.petsRepository.findAll();
  }

  async findOne(id: number) {
    const pet = await this.petsRepository.findOne(id);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    await this.findOne(id);

    const data: Prisma.PetUpdateInput = {
      ...updatePetDto,
      birthDate: updatePetDto.birthDate ? new Date(updatePetDto.birthDate) : undefined,
    };

    return this.petsRepository.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.petsRepository.remove(id);
  }

  // OBS: Os métodos addTutor e removeTutor foram deletados daqui
  // porque agora eles pertencem ao PetTutorService.
}