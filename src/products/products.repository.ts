import { EntityManager, EntityRepository } from 'typeorm';
import { Product } from './products.entity';

@EntityRepository()
export class ProductsRepository {

    constructor(private entityManager: EntityManager) {
    }

    findOne(id: number): Promise<Product> {
        return this.entityManager.findOne(Product, { id });
    }

    save(product: Product): Promise<Product> {
        return this.entityManager.save(Product, product);
    }

    find(): Promise<Product[]> {
        return this.entityManager.find(Product);
    }

    delete(id: number) {
        return this.entityManager.delete(Product, { id });
    }

}
