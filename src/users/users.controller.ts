import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Patch('/:id')
  UpdateUser(@Body() UserData: UserDto, @Param('id') id: string) {
    return this.userService.UpdateUser(UserData, id)
  }

  @Delete('/:id')
  DeleteUser(@Param('id') id: string) {
    return this.userService.DeleteUser(id);
  }
}
