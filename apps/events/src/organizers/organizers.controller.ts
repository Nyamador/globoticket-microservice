import { Controller, Get } from '@nestjs/common';
import { OrganizersService } from './organizers.service';

@Controller('organizers')
export class OrganizersController {
  constructor(private organizerService: OrganizersService) {}

  // @Get(':id')
  // async getOrganizerById(id: string) {
  //   return await this.organizerService.getOrganizerById(id);
  // }
}
