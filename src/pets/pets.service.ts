import { Injectable, NotFoundException } from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private readonly petsRepository: PetsRepository) {}

  async create(ownerId: number, createPetDto: CreatePetDto) {
    return this.petsRepository.create(ownerId, createPetDto);
  }

  async findAll() {
    const allPets = await this.petsRepository.findAll();

    if (!allPets) {
      throw new NotFoundException('No pets found');
    }

    return allPets;
  }

  async findOne(id: number) {
    const pet = await this.petsRepository.findOne(id);

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const selectedPet = await this.findOne(id);

    if (!selectedPet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return this.petsRepository.update(id, updatePetDto);
  }

  async remove(id: number) {
    const pet = await this.findOne(id);

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return this.petsRepository.remove(id);
  }
}
