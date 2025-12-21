import { Module } from '@nestjs/common';
import { PetTutorService } from './pet-tutor.service';
import { PetTutorController } from './pet-tutor.controller';
import { PetTutorRepository } from './pet-tutor.repository';
import { PetsModule } from 'src/pets/pets.module';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, PetsModule, UsersModule],
  controllers: [PetTutorController],
  providers: [PetTutorService, PetTutorRepository],
})
export class PetTutorModule {}
