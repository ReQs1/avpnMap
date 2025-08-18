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
import { UpdateVisitDto } from './dto/update-visit.dto';

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

    return {
      message: 'Visit created successfully',
    };
  }

  @UseGuards(JwtGuard)
  @Patch(':pizzeriaId')
  async updateVisit(
    @Param('pizzeriaId', ParseIntPipe) pizzeriaId: number,
    @Req() req: JwtPayloadRequest,
    @Body() updateVisitBody: UpdateVisitDto,
  ) {
    const userId = req.user.sub;
    await this.visitsService.updateVisit(userId, pizzeriaId, updateVisitBody);
    return { message: 'Visit updated successfully' };
  }

  @Delete(':visitId')
  deleteVisit(@Param('visitId', ParseIntPipe) visitId: number) {
    //  todo: implement deleting a visit with jwt Guard
    console.log('Deleting visit with id:', visitId);
  }
}
