import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {UserCreateRequest} from "./dtos/user-create-request.dto";
import {UserUpdateRequest} from "./dtos/user-update-request.dto";
import {ApiTags} from "@nestjs/swagger";
import { UsersService } from './users.service';
import { UserCreateResponse } from './dtos/user-create-response.dto';

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() request: UserCreateRequest): Promise<UserCreateResponse> {
        return this.usersService.create(request);
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
