import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, HealthRecord, RecordType } from '@prisma/client';

@Injectable()
export class HealthRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: Prisma.HealthRecordCreateInput): Promise<HealthRecord> {
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

  async update(
    id: number,
    data: Prisma.HealthRecordUpdateInput,
  ): Promise<HealthRecord> {
    return this.prisma.healthRecord.update({ where: { id }, data });
  }

  async remove(id: number): Promise<HealthRecord> {
    return this.prisma.healthRecord.delete({ where: { id } });
  }
}
