import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Booking } from '.prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(
    data: Omit<Booking, 'id' | 'createdAt' | 'quantity' | 'updatedAt'>,
  ) {
    return this.prisma.booking.create({ data });
  }

  async getBookings() {
    return this.prisma.booking.findMany();
  }
}
