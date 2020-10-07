import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import {ProductsService} from "./products.service";
import {ProductsRepository} from "./products.repository";
import {UsersService} from "../users/users.service";

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, ProductsRepository, UsersService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
