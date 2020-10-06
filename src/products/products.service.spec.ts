import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {ProductsRepository} from "./products.repository";

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepository],
    }).compile();

    repository = module.get<ProductsRepository>(ProductsRepository);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
