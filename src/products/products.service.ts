import {Injectable} from '@nestjs/common';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {ProductCreateRequest} from './dtos/product-create-request.dto';
import {ProductCreateResponse} from './dtos/product-create-response.dto';
import {ProductFindResponse} from './dtos/product-find-response.dto';
import {ProductListResponse} from './dtos/product-list-response.dto';
import {ProductUpdateRequest} from './dtos/product-update-request.dto';
import {ProductUpdateResponse} from './dtos/product-update-response.dto';
import {ProductNotFoundException} from './exceptions/product-not-found.exception';
import {Product} from "./products.entity";
import {ProductsRepository} from './products.repository';

@Injectable()
export class ProductsService {

    constructor(private productsRepository: ProductsRepository) {
    }

    async create(request: ProductCreateRequest) {
        const product = plainToClass(Product, request);
        await this.productsRepository.save(product);
        return plainToClass(ProductCreateResponse, product, {excludeExtraneousValues: true});
    }

    async findAll(): Promise<ProductListResponse[]> {
        const result = await this.productsRepository.find();
        return plainToClass(ProductListResponse, result, {excludeExtraneousValues: true});
    }

    async findOne(id: number): Promise<ProductFindResponse> {
        const product = await this.productsRepository.findOne(id)
        if (!product) throw new ProductNotFoundException(id);
        return plainToClass(ProductFindResponse, product, {excludeExtraneousValues: true});
    }

    async update(id: number, changes: ProductUpdateRequest): Promise<ProductUpdateResponse> {
        const product = await this.productsRepository.findOne(id)
        if (!product) throw new ProductNotFoundException(id);
        plainToClassFromExist(product, changes);
        await this.productsRepository.save(product);
        return plainToClass(ProductUpdateResponse, product, {excludeExtraneousValues: true})
    }

    async delete(id: number) {
        await this.productsRepository.delete(id)
    }

}
