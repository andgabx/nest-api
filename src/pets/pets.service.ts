import { Injectable, NotFoundException } from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private readonly petsRepository: PetsRepository) {}

  async create(ownerId: number, createPetDto: CreatePetDto) {
    return this.petsRepository.create(ownerId, createPetDto);
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

    return this.petsRepository.update(id, updatePetDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.petsRepository.remove(id);
  }
}
