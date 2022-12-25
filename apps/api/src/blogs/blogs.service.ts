import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = await this.blogModel.create(createBlogDto);
    return createdBlog;
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedBlog = await this.blogModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedBlog;
  }
}
