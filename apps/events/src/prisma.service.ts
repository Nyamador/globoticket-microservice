import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

@Injectable()
@Global()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      console.error(e);
    }
  }
}
