import { Module } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { OrganizersController } from './organizers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrganizersService, PrismaService],
  controllers: [OrganizersController]
})
export class OrganizersModule {}
