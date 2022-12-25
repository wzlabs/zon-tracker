import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './schemas/blog.schema';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    await this.blogsService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.blogsService.delete(id);
  }
}
