import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogsService } from './blogs.service';

describe('Blogs Controller', () => {
  let controller: BlogsController;
  let service: BlogsService;
  const createBlogDto: CreateBlogDto = {
    name: 'Blog #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockBlog = {
    name: 'Blog #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Blog #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'Blog #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'Blog #3',
                breed: 'Breed #3',
                age: 2,
              },
            ]),
            create: jest.fn().mockResolvedValue(createBlogDto),
          },
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    service = module.get<BlogsService>(BlogsService);
  });

  describe('create()', () => {
    it('should create a new blog', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockBlog);

      await controller.create(createBlogDto);
      expect(createSpy).toHaveBeenCalledWith(createBlogDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of blogs', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Blog #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Blog #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Blog #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
