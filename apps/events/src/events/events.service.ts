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
    // // Function to generate a random date within the next 30 days
    // const generateRandomDate = () => {
    //   const currentDate = new Date();
    //   const futureDate = new Date(
    //     currentDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000,
    //   );
    //   return futureDate.toISOString();
    // };

    // // Generate 8 events
    // const generateEvents = () => {
    //   const events = [];

    //   for (let i = 1; i <= 10; i++) {
    //     const event = {
    //       id: faker.string.uuid(),
    //       name: `Event ${i}`,
    //       slug: `event-${i}`,
    //       description: faker.lorem.sentence(),
    //       date: generateRandomDate(),
    //       location: faker.location.city(),
    //       organizerId: 'dbc61e44-3952-4c21-a008-e7e7b8e98048',
    //       imageURL: faker.image.url(),
    //       createdAt: new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //     };

    //     events.push(event);
    //   }

    //   return events;
    // };

    // Display the generated events
    // const events = generateEvents();
    // console.log(JSON.stringify(events, null, 2));
    // return events;
    // return await this.prisma.event.createMany({ data: events });

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
