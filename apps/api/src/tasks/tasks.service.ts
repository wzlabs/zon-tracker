import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.taskModel.create(createTaskDto);
    return createdTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findOne({ _id: id }).exec();
  }

  async filterBy(
    user_id?: string,
    plan_id?: string,
    assignee_id?: string,
  ): Promise<Task[]> {
    const filter: { user_id?: string; plan_id?: string; assignee_id?: string } =
      {};
    if (user_id) {
      filter.user_id = user_id;
    }
    if (plan_id) {
      filter.plan_id = plan_id;
    }
    if (assignee_id) {
      filter.assignee_id = assignee_id;
    }
    return this.taskModel.find(filter).exec();
  }

  async delete(id: string) {
    const deletedTask = await this.taskModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTask;
  }
}
