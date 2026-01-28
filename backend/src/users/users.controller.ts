import { Controller, Get, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserStatus } from '../enums/userStatus.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login/:username')
  async login(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`The user - ${username} - not found`);
    }

    if (user.status === UserStatus.Deleted) {
      throw new UnauthorizedException('User has been deleted');
    }

    return user;
  }

    @Get('/')
  async users(): Promise<User[]> {
    const users = await this.usersService.get();

    return users;
  }
}
