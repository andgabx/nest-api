import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetsRepository } from './pets.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
  // VITAL: You must export the Repository so PetTutorModule can use it
  exports: [PetsRepository],
})
export class PetsModule {}
