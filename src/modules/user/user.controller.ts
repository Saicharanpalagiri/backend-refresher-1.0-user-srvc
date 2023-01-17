import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Response
} from '@nestjs/common';
import { LoginDto } from 'src/submodules/backend-refresher-1.0-dtos/src/dtos/login.dto';
import { UserDto } from 'src/submodules/backend-refresher-1.0-dtos/src/dtos/user.dto';
import { UserService } from './User.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: UserDto) {
    try {
      let createdUser = await this.userService.createUser(user)
      return createdUser
      //console.log('control is here', user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //login
  @Post('/login')
  async loginUser(@Body() user: LoginDto) {
    try {
      let loginUser = await this.userService.loginUser(user)
      return loginUser
      //console.log('control is here', user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  async findUser(){
    try{
      let fetchedUser = await this.userService.findAll();
      return fetchedUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put()
  async updateUser(@Body() user: UserDto) {
    try {
      let updateResult = await this.userService.updateUser(user);
      return updateResult;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    try{
      let deletedUser = await this.userService.deleteUser(userId);
      return deletedUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

}

