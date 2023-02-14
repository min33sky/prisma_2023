import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.getUser(userId);
    return user;
  }

  @Post()
  async createUser(@Body() body) {
    const newUser = await this.userService.createUser(body);
    return newUser;
  }

  @Post('many')
  async createUsers() {
    const newUsers = await this.userService.createUsers();
    return newUsers;
  }

  @Patch()
  async updateUser(@Body() body) {
    const newInfo = await this.userService.updateUser(body);
    return newInfo;
  }

  @Delete()
  async deleteUser(@Query('userId') userId: string) {
    const deleteUser = await this.userService.deleteUser(+userId);
    return deleteUser;
  }
}
