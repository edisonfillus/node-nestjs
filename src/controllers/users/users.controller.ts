import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {UserCreateRequest} from "../../models/dtos/user-create-request.dto";
import {UserUpdateRequest} from "../../models/dtos/user-update-request.dto";

@Controller('users')
export class UsersController {

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() request: UserCreateRequest): string {
        return 'This action adds a new user';
    }

    @Get()
    findAll(): string {
        return 'This action returns all users';
    }

    @Get(':id')
    findOne(@Param('id') id: number): string {
        return `This action returns a #${id} user`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() request: UserUpdateRequest) {
      return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return `This action removes a #${id} cat`;
    }


}
