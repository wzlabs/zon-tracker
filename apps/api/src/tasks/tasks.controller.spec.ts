import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

const completed_date = new Date().getTime();
const created_date = new Date().getTime();

describe('Tasks Controller', () => {
  let controller: TasksController;
  let service: TasksService;
  const createTaskDto: CreateTaskDto = {
    plan_id: 'Plan Id #1',
    user_id: 'User Id #1',
    assignee_id: 'User Id #1',
    title: 'Horse Opening',
    desc: 'Horse Opening Desc',
    completed: false,
    completed_date: null,
    created_date: new Date().getTime(),
  };

  const mockTask = {
    plan_id: 'Plan Id #1',
    user_id: 'User Id #1',
    assignee_id: 'User Id #1',
    title: 'Horse Opening',
    desc: 'Horse Opening Desc',
    completed: false,
    completed_date: null,
    created_date: created_date,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                plan_id: 'Plan Id #1',
                user_id: 'User Id #1',
                assignee_id: 'User Id #1',
                title: 'Horse Opening',
                desc: 'Horse Opening Desc',
                completed: true,
                completed_date: completed_date,
                created_date: created_date,
              },
              {
                plan_id: 'Plan Id #2',
                user_id: 'User Id #1',
                assignee_id: 'User Id #1',
                title: 'Pawn Opening',
                desc: 'Pawn Opening Desc',
                completed: false,
                completed_date: null,
                created_date: created_date,
              },
              {
                plan_id: 'Plan Id #3',
                user_id: 'User Id #1',
                assignee_id: 'User Id #1',
                title: 'Elepant Opening',
                desc: 'Elepant Opening Desc',
                completed: false,
                completed_date: null,
                created_date: created_date,
              },
            ]),
            create: jest.fn().mockResolvedValue(createTaskDto),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  describe('create()', () => {
    it('should create a new task', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockTask);

      await controller.create(createTaskDto);
      expect(createSpy).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of tasks', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          plan_id: 'Plan Id #1',
          user_id: 'User Id #1',
          assignee_id: 'User Id #1',
          title: 'Horse Opening',
          desc: 'Horse Opening Desc',
          completed: true,
          completed_date: completed_date,
          created_date: created_date,
        },
        {
          plan_id: 'Plan Id #2',
          user_id: 'User Id #1',
          assignee_id: 'User Id #1',
          title: 'Pawn Opening',
          desc: 'Pawn Opening Desc',
          completed: false,
          completed_date: null,
          created_date: created_date,
        },
        {
          plan_id: 'Plan Id #3',
          user_id: 'User Id #1',
          assignee_id: 'User Id #1',
          title: 'Elepant Opening',
          desc: 'Elepant Opening Desc',
          completed: false,
          completed_date: null,
          created_date: created_date,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
