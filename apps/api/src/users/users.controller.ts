import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { createCipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { v4 } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.userId = v4();

    // Default values
    createUserDto.isStaff = false;
    createUserDto.isActive = false;
    createUserDto.isSuperuser = false;
    createUserDto.verifiedEmail = false;
    createUserDto.lastLogin = null;
    createUserDto.dateJoined = new Date().getTime();

    if (
      !createUserDto.username ||
      createUserDto.username.length < 6 ||
      !createUserDto.email ||
      !createUserDto.password ||
      createUserDto.password.length < 6
    ) {
      throw new HttpException(
        'The fields are not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = passwordHash;
    createUserDto.salt = salt;

    // Create a new user
    await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
