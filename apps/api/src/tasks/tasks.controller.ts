import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/tasks.schema';
import { serialize, instanceToPlain, classToPlain } from 'class-transformer';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    // console.log('here..........', createTaskDto);
    const res = await this.tasksService.create(createTaskDto);
    // console.log('res data now........', res);
    // console.log('yeah........id', res.id);
    // const resjson = JSON.stringify(instanceToPlain(res));
    // console.log('resjson..........', resjson);
    // console.log('simplejson..........', JSON.stringify(res));
    // console.log('classtoplain..........', instanceToPlain(res));
    return res;
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Get('/filter/:user_id')
  async filterBy(@Param('user_id') user_id: string): Promise<Task[]> {
    return this.tasksService.filterBy(user_id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
