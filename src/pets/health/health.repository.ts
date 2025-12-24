import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, HealthRecord, RecordType } from '@prisma/client';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';

@Injectable()
export class HealthRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    petId: number,
    createHealthDto: CreateHealthRecordDto,
  ): Promise<HealthRecord> {
    const { date, nextDueDate, ...rest } = createHealthDto;

    const data: Prisma.HealthRecordCreateInput = {
      ...rest,
      date: new Date(date),
      nextDueDate: nextDueDate ? new Date(nextDueDate) : undefined,
      pet: {
        connect: { id: petId },
      },
    };

    return this.prisma.healthRecord.create({ data });
  }

  async findAllByPet(
    petId: number,
    type?: RecordType,
  ): Promise<HealthRecord[]> {
    return this.prisma.healthRecord.findMany({
      where: {
        petId,
        type: type ? type : undefined,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number): Promise<HealthRecord | null> {
    return this.prisma.healthRecord.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateHealthRecordDto): Promise<HealthRecord> {
    const { date, nextDueDate, ...rest } = data;

    const updateData: Prisma.HealthRecordUpdateInput = {
      ...rest,
      date: date ? new Date(date) : undefined,
      nextDueDate: nextDueDate ? new Date(nextDueDate) : undefined,
    };
    return this.prisma.healthRecord.update({ where: { id }, data: updateData });
  }

  async remove(id: number): Promise<HealthRecord> {
    return this.prisma.healthRecord.delete({ where: { id } });
  }
}
