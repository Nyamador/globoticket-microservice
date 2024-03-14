import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { faker } from '@faker-js/faker';
import { Event } from '.prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.event.create({
      data,
    });
  }

  async getAllEvents() {
    return await this.prisma.event.findMany();
  }

  async getEventById(id: string) {
    return await this.prisma.event.findUnique({ where: { id } });
  }

  async updateEvent(id: string, data: Partial<Event>) {
    return await this.prisma.event.update({ where: { id }, data });
  }

  async deleteEvent(id: string) {
    return await this.prisma.event.delete({ where: { id } });
  }

  // async getEventAttendees(id: string) {
  //   return this.prisma.event.findUnique({ where: { id } }).attendees();
  // }
}
