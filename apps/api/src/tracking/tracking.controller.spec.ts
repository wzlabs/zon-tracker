import { Test, TestingModule } from '@nestjs/testing';
import { TrackingController } from './tracking.controller';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { TrackingService } from './tracking.service';

const completed_date = new Date().getTime();
const created_date = new Date().getTime();

describe('Tracking Controller', () => {
  let controller: TrackingController;
  let service: TrackingService;
  const createTrackingDto: CreateTrackingDto = {
    user_id: 'User Id #1',
    work_day: created_date,
    start_time: created_date,
    nb_of_seconds: 0,
    created_date: created_date,
  };

  const mockTracking = {
    user_id: 'User Id #1',
    work_day: created_date,
    start_time: created_date,
    nb_of_seconds: 0,
    created_date: created_date,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [
        {
          provide: TrackingService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            create: jest.fn().mockResolvedValue(createTrackingDto),
          },
        },
      ],
    }).compile();

    controller = module.get<TrackingController>(TrackingController);
    service = module.get<TrackingService>(TrackingService);
  });

  describe('create()', () => {
    it('should create a new tracking', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockTracking);

      await controller.create(createTrackingDto);
      expect(createSpy).toHaveBeenCalledWith(createTrackingDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of tracking', async () => {
      expect(controller.findAll()).resolves.toEqual([
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
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
