import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { EmployeesRepository } from './employees/employees.repository';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule],
  controllers: [AppController, UsersController, EmployeesController],
  providers: [AppService, UsersService, EmployeesService, EmployeesRepository],
})
export class AppModule {}
