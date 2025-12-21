// src/employees/employees.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly repository: EmployeesRepository) {}

  async create(data: Prisma.EmployeeCreateInput) {
    const exists = await this.repository.findAll({
      where: { email: data.email },
    });
    if (exists.length > 0) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    return this.repository.create(data);
  }

  async findAll(role?: Role) {
    return this.repository.findAll({
      where: role ? { role } : {},
    });
  }

  async findOne(id: number) {
    const employee = await this.repository.findOne(id);
    if (!employee) throw new NotFoundException('  não encontrado');
    return employee;
  }

  async update(id: number, data: Prisma.EmployeeUpdateInput) {
    await this.findOne(id);
    return this.repository.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
