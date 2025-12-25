import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTutorDto } from './dto/add-tutor.dto';
import { PetTutorRepository } from './pet-tutor.repository';
import { UsersService } from 'src/users/users.service';
import { PetsService } from 'src/pets/pets.service';

@Injectable()
export class PetTutorService {
  constructor(
    private readonly petTutorRepository: PetTutorRepository,
    private readonly usersService: UsersService,
    private readonly petsService: PetsService, 
  ) {}

  async addTutor(petId: number, addTutorDto: AddTutorDto) {
    const pet = await this.petsService.findOne(petId);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    const tutor = await this.usersService.findByEmail(addTutorDto.email);
    if (!tutor) {
      throw new NotFoundException(
        `User with email ${addTutorDto.email} not found`,
      );
    }

    return this.petTutorRepository.addTutor(petId, tutor.id);
  }

  async removeTutor(petId: number, tutorId: number) {
    const pet = await this.petsService.findOne(petId);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    return this.petTutorRepository.removeTutor(petId, tutorId);
  }
}
