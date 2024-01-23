import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @Post()
  async createBooking(@Body() data: CreateBookingDto) {
    return await this.bookingService.createBooking(data);
  }
}
