import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateRequest } from './dtos/user-create-request.dto';
import { UserCreateResponse } from './dtos/user-create-response.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository = {
     save: jest.fn(),
     findOne: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersRepository
        }
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should not create duplicated users',async ()=>{
    const userToCreate: UserCreateRequest = {
      name: 'User',
      email: 'user@mail.com',
      password: '123456'
    }
    usersRepository.findOne.mockImplementation(()=>userToCreate)
    await expect(() => usersService.create(userToCreate)).rejects.toThrow(UserAlreadyExistsException);
  });

  
  it('should create user',async ()=>{
    const userToCreate: UserCreateRequest = {
      name: 'User',
      email: 'user@mail.com',
      password: '123456'
    }
    const userSaved: User = {
      id: 1,
      name: 'User',
      email: 'user@mail.com',
      password: '123456'
    }
    const expectedResult: UserCreateResponse = {
      id: 1,
      name: 'User',
      email: 'user@mail.com'
    }
    usersRepository.findOne.mockImplementation(()=>undefined)
    usersRepository.save.mockImplementation(()=>userSaved)

    const result = await usersService.create(userToCreate);

    expect(result).toMatchObject(expectedResult);
  });


});
