import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Tracking } from './schemas/tracking.schema';
import { serialize, instanceToPlain, classToPlain } from 'class-transformer';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async create(@Body() createTrackingDto: CreateTrackingDto) {
    // console.log('here..........', createTrackingDto);
    const res = await this.trackingService.create(createTrackingDto);
    // console.log('res data now........', res);
    // console.log('yeah........id', res.id);
    // const resjson = JSON.stringify(instanceToPlain(res));
    // console.log('resjson..........', resjson);
    // console.log('simplejson..........', JSON.stringify(res));
    // console.log('classtoplain..........', instanceToPlain(res));
    return res;
  }

  @Get()
  async findAll(): Promise<Tracking[]> {
    return this.trackingService.findAll();
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string): Promise<Tracking> {
    return this.trackingService.findOne(id);
  }

  @Get('/filter/:user_id')
  async filterBy(@Param('user_id') user_id: string): Promise<Tracking[]> {
    return this.trackingService.filterBy(user_id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.trackingService.delete(id);
  }
}
