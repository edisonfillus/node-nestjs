import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserCreateRequest } from './dtos/user-create-request.dto';
import { UserCreateResponse } from './dtos/user-create-response.dto';
import { UserFindResponse } from './dtos/user-find-response.dto';
import { UserLoginResponse } from './dtos/user-login-response.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository) {}

    async create(request: UserCreateRequest): Promise<UserCreateResponse> {
      if(await this.usersRepository.findOne({email:request.email})){
        throw new UserAlreadyExistsException(request.email);
      }
      const userToSave = plainToClass(User,request);  
      const result = await this.usersRepository.save(userToSave);
      return plainToClass(UserCreateResponse,result,{excludeExtraneousValues: true});
    }

    async findOne(email: string): Promise<UserFindResponse> {
        const user = await this.usersRepository.findOne({email});
        if(user){
          return plainToClass(UserFindResponse,user);
        } else {
          return undefined;
        }
    }

    async findForLogin(email: string): Promise<UserLoginResponse> {
      const user = await this.usersRepository.findOne({email});
      if(user){
        return plainToClass(UserLoginResponse,user);
      } else {
        return undefined;
      }
  }

}
