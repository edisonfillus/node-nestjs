import { ProductsRepository } from './products.repository';
import { EntityManager } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Product } from './products.entity';

describe('ProductRepository', () => {

    let repository: ProductsRepository;
    let entityManager: EntityManager;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqljs',
                    synchronize: true,
                    entities: [Product],
                    keepConnectionAlive: false,
                    logging: 'all',
                }),
            ],
            providers: [ProductsRepository],
        }).compile();
        repository = module.get<ProductsRepository>(ProductsRepository);
        entityManager = module.get<EntityManager>(EntityManager);
    });

    afterEach(async () => {
        await entityManager.connection.close();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createProduct', () => {
        it('given valid product, when save, then persist successful', async () => {
            // Given
            const product = entityManager.create(Product, {
                name: 'My product',
                description: 'My description',
            });

            // When
            const created = await repository.save(product);
            expect(created.id).toBeGreaterThan(0);

        });
    });


});
