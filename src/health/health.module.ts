import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { HealthRepository } from './health.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [DatabaseModule, PetsModule],
  controllers: [HealthController],
  providers: [HealthService, HealthRepository],
})
export class HealthModule {}
