import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
    let controller: ProductsController;
    const productsService = {
        create: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: productsService,
                },
            ],
        }).compile();
        controller = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
