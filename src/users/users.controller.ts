import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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

  @Delete()
  async deleteUser(@Query('userId') userId: string) {
    const deleteUser = await this.userService.deleteUser(+userId);
    return deleteUser;
  }
}
