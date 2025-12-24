import { Injectable, NotFoundException } from '@nestjs/common';
import { HealthRepository } from './health.repository';
import { PetsRepository } from 'src/pets/pets.repository';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { Prisma, RecordType } from '@prisma/client';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthRepository: HealthRepository,
    private readonly petsRepository: PetsRepository,
  ) {}

  async create(petId: number, createHealthDto: CreateHealthRecordDto) {
    const pet = await this.petsRepository.findOne(petId);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    return this.healthRepository.create(petId, createHealthDto);
  }

  async findAllByPet(petId: number, type?: RecordType) {
    const pet = await this.petsRepository.findOne(petId);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }
    return this.healthRepository.findAllByPet(petId, type);
  }

  async findOne(id: number) {
    const record = await this.healthRepository.findOne(id);
    if (!record) {
      throw new NotFoundException(`Health Record with ID ${id} not found`);
    }
    return record;
  }

  async update(id: number, updateHealthRecordDto: UpdateHealthRecordDto) {
    await this.findOne(id);

    return this.healthRepository.update(id, updateHealthRecordDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.healthRepository.remove(id);
  }
}
