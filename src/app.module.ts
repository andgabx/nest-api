import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PetsModule } from './pets/pets.module';
import { PetTutorModule } from './pet-tutor/pet-tutor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PetsModule,
    PetTutorModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
