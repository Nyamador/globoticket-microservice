import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrganizersService {
  constructor(private prisma: PrismaService) {}
}
