import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetsRepository } from './pets.repository';
import { DatabaseModule } from 'src/database/database.module';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { HealthRepository } from './health/health.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController, HealthController],
  providers: [PetsService, PetsRepository, HealthService, HealthRepository],
  exports: [PetsRepository],
})
export class PetsModule {}
