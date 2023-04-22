import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { JwtAuthGuard } from '../../../modules/auth/service/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get("all")
  fetchAllUsers(@Request() req): Promise<User[]> {
    // console.log(req.user)
    return this.userService.findAll();
  }
}
