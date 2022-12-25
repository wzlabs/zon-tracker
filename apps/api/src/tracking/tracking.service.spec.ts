import { Test, TestingModule } from '@nestjs/testing';
import { TrackingService } from './tracking.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tracking } from './schemas/tracking.schema';
import { Model } from 'mongoose';

const completed_date = new Date().getTime();
const created_date = new Date().getTime();

const mockTracking = {
  user_id: 'User Id #1',
  work_day: created_date,
  start_time: created_date,
  nb_of_seconds: 0,
  created_date: created_date,
};

describe('TrackingService', () => {
  let service: TrackingService;
  let model: Model<Tracking>;

  const trackingArray = [
    {
      user_id: 'User Id #1',
      work_day: created_date,
      start_time: created_date,
      nb_of_seconds: 0,
      created_date: created_date,
    },
    {
      user_id: 'User Id #2',
      work_day: created_date,
      start_time: created_date,
      nb_of_seconds: 0,
      created_date: created_date,
    },
    {
      user_id: 'User Id #3',
      work_day: created_date,
      start_time: created_date,
      nb_of_seconds: 0,
      created_date: created_date,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackingService,
        {
          provide: getModelToken('Tracking'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTracking),
            constructor: jest.fn().mockResolvedValue(mockTracking),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrackingService>(TrackingService);
    model = module.get<Model<Tracking>>(getModelToken('Tracking'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tracking', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(trackingArray),
    } as any);
    const tracking = await service.findAll();
    expect(tracking).toEqual(trackingArray);
  });

  it('should insert a new tracking', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        user_id: 'User Id #1',
        work_day: created_date,
        start_time: created_date,
        nb_of_seconds: 0,
        created_date: created_date,
      }),
    );
    const newTracking = await service.create({
      user_id: 'User Id #1',
      work_day: created_date,
      start_time: created_date,
      nb_of_seconds: 0,
      created_date: created_date,
    });
    expect(newTracking).toEqual(mockTracking);
  });
});
