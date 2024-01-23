import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { OrganizersModule } from './organizers/organizers.module';
import { AttendeesModule } from './attendees/attendees.module';

@Module({
  imports: [EventsModule, OrganizersModule, AttendeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
