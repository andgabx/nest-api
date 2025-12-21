// src/employees/employees.repository.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({ data });
  }

  async findAll(params: { where?: Prisma.EmployeeWhereInput }) {
    return this.prisma.employee.findMany({ where: params.where });
  }

  async findOne(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.EmployeeUpdateInput) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
