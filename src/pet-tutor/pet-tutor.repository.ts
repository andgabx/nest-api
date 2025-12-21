import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Pet } from '@prisma/client';

@Injectable()
export class PetTutorRepository {
  constructor(private readonly prisma: DatabaseService) {}

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
      include: {
        tutors: true,
      },
    });
  }
}
