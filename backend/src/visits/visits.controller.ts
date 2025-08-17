import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { JwtPayloadRequest } from 'src/auth/interfaces/interfaces';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private visitsService: VisitsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createVisit(
    @Req() req: JwtPayloadRequest,
    @Body() createVisitDto: CreateVisitDto,
  ) {
    const userId = req.user.sub;

    await this.visitsService.createVisit(userId, createVisitDto);

    return { message: 'Visit created successfully' };
  }

  @Patch(':id')
  updateVisit(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitBody: any,
  ) {
    //  todo: implement updating a visit with jwt Guard
    console.log('Updating visit with body:', updateVisitBody);
  }

  @Delete(':id')
  deleteVisit(@Param('id', ParseIntPipe) id: number) {
    //  todo: implement deleting a visit with jwt Guard
    console.log('Deleting visit with id:', id);
  }
}
