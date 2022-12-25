import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';

const completed_date = new Date().getTime();
const created_date = new Date().getTime();

const mockTask = {
  plan_id: 'Plan Id #1',
  user_id: 'User Id #1',
  assignee_id: 'User Id #1',
  title: 'Horse Opening',
  desc: 'Horse Opening Desc',
  completed: false,
  completed_date: null,
  created_date: created_date,
};

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  const tasksArray = [
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
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTask),
            constructor: jest.fn().mockResolvedValue(mockTask),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken('Task'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tasks', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(tasksArray),
    } as any);
    const tasks = await service.findAll();
    expect(tasks).toEqual(tasksArray);
  });

  it('should insert a new task', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        plan_id: 'Plan Id #1',
        user_id: 'User Id #1',
        assignee_id: 'User Id #1',
        title: 'Horse Opening',
        desc: 'Horse Opening Desc',
        completed: true,
        completed_date: completed_date,
        created_date: created_date,
      }),
    );
    const newTask = await service.create({
      plan_id: 'Plan Id #1',
      user_id: 'User Id #1',
      assignee_id: 'User Id #1',
      title: 'Horse Opening',
      desc: 'Horse Opening Desc',
      completed: true,
      completed_date: completed_date,
      created_date: created_date,
    });
    expect(newTask).toEqual(mockTask);
  });
});
