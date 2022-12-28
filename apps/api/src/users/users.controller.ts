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
  // ClassSerializerInterceptor,
  // UseInterceptors,
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

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.userId = v4();

    // Default values
    createUserDto.isStaff = false;
    createUserDto.isActive = true;
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

    const existedUser: User = await this.usersService.findOneByUsername(
      createUserDto.username,
    );

    if (existedUser) {
      throw new HttpException(
        'The email has been already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = passwordHash;
    createUserDto.salt = salt;

    // Create a new user
    const cUser: User = await this.usersService.create(createUserDto);

    return {
      _id: cUser._id,
      userId: cUser.userId,
      username: cUser.username,
      email: cUser.email,
      firstName: cUser.firstName,
      lastName: cUser.lastName,
      isActive: cUser.isActive,
      isStaff: cUser.isStaff,
      isSuperuser: cUser.isSuperuser,
      verifiedEmail: cUser.verifiedEmail,
    };
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
