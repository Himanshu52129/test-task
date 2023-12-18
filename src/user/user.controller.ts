import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Fetch User Info',
    description: 'Endpoint to fetch only default users info',
  })
  getUser(@Param('id') userId: number) {
    return this.userService.getUser(userId);
  }
}
