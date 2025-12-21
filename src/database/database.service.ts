import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    // 1. Cria o Pool do driver nativo 'pg'
    const pool = new Pool({ connectionString });

    // 2. Cria o adaptador do Prisma
    const adapter = new PrismaPg(pool);

    // 3. Passa para o PrismaClient.
    // Isso resolve o erro "needs to be constructed with non-empty options"
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
