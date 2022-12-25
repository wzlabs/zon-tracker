import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Tracking, TrackingDocument } from './schemas/tracking.schema';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(Tracking.name)
    private readonly trackingModel: Model<TrackingDocument>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    const createdTracking = await this.trackingModel.create(createTrackingDto);
    return createdTracking;
  }

  async findAll(): Promise<Tracking[]> {
    return this.trackingModel.find().exec();
  }

  async findOne(id: string): Promise<Tracking> {
    return this.trackingModel.findOne({ _id: id }).exec();
  }

  async filterBy(user_id?: string, work_day?: number): Promise<Tracking[]> {
    const filter: { user_id?: string; work_day?: number } = {};
    if (user_id) {
      filter.user_id = user_id;
    }
    if (work_day) {
      filter.work_day = work_day;
    }
    return this.trackingModel.find(filter).exec();
  }

  async delete(id: string) {
    const deletedTracking = await this.trackingModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTracking;
  }
}
