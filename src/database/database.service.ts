import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Necessário para o driver do Neon funcionar em ambiente Node.js
neonConfig.webSocketConstructor = ws;

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    const pool = new Pool({ connectionString });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    const adapter = new PrismaNeon(pool as any);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
