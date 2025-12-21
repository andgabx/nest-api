import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Pet } from '@prisma/client';

@Injectable()
export class PetsRepository {
  constructor(private readonly prisma: DatabaseService) {}

  // Create a pet and link it to an Owner (User)
  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    return this.prisma.pet.create({
      data,
      include: {
        owner: true, // Optionally return the owner details
      },
    });
  }

  // Find all pets (with optional filtering logic if needed later)
  async findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany({
      include: {
        owner: { select: { id: true, name: true, email: true } }, // Return basic owner info
      },
    });
  }

  // Find a specific pet by ID
  async findOne(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({
      where: { id },
      include: {
        owner: true,
        tutors: true, // Include tutors to see who else takes care of this pet
      },
    });
  }

  // Update pet details
  async update(id: number, data: Prisma.PetUpdateInput): Promise<Pet> {
    return this.prisma.pet.update({
      where: { id },
      data,
    });
  }

  // Delete a pet
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
          connect: { id: tutorId }, // Connects the existing User to this Pet
        },
      },
      include: {
        tutors: true, // Return the updated list of tutors
      },
    });
  }

  async removeTutor(petId: number, tutorId: number): Promise<Pet> {
    return this.prisma.pet.update({
      where: { id: petId },
      data: {
        tutors: {
          disconnect: { id: tutorId }, // Removes the link
        },
      },
    });
  }
}
