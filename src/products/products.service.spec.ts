import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {ProductsRepository} from "./products.repository";

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository = {
    save: jest.fn(),
    findOne: jest.fn()
 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService, 
        {
          provide: ProductsRepository,
          useValue: productsRepository
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
