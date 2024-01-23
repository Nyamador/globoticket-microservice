import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, EditEventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.eventsService.getEventById(id);
  }

  // @Get(':id/attendees')
  // async getEventAttendees(id: string) {
  //   return await this.eventsService.getEventAttendees(id);
  // }

  @Post()
  async createEvent(@Body() data: CreateEventDto) {
    return await this.eventsService.createEvent(data);
  }

  @Patch(':id')
  async updateEvent(id: string, @Body() data: EditEventDto) {
    return await this.eventsService.updateEvent(id, data);
  }
}
