import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { getModelToken } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import { Model } from 'mongoose';

const mockBlog = {
  name: 'Blog #1',
  breed: 'Breed #1',
  age: 4,
};

describe('BlogsService', () => {
  let service: BlogsService;
  let model: Model<Blog>;

  const blogsArray = [
    {
      name: 'Blog #1',
      breed: 'Breed #1',
      age: 4,
    },
    {
      name: 'Blog #2',
      breed: 'Breed #2',
      age: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getModelToken('Blog'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBlog),
            constructor: jest.fn().mockResolvedValue(mockBlog),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    model = module.get<Model<Blog>>(getModelToken('Blog'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all blogs', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(blogsArray),
    } as any);
    const blogs = await service.findAll();
    expect(blogs).toEqual(blogsArray);
  });

  it('should insert a new blog', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Blog #1',
        breed: 'Breed #1',
        age: 4,
      }),
    );
    const newBlog = await service.create({
      name: 'Blog #1',
      breed: 'Breed #1',
      age: 4,
    });
    expect(newBlog).toEqual(mockBlog);
  });
});
