import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import {ProductCreateRequest} from "./dtos/product-create-request.dto";
import {ProductCreateResponse} from './dtos/product-create-response.dto';
import {ProductFindResponse} from './dtos/product-find-response.dto';
import {ProductListResponse} from './dtos/product-list-response.dto';
import {ProductUpdateRequest} from './dtos/product-update-request.dto';
import {ProductUpdateResponse} from './dtos/product-update-response.dto';
import {ProductsService} from "./products.service";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("Products")
@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid Request'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error'})
    create(@Body() request: ProductCreateRequest): Promise<ProductCreateResponse> {
        return this.productsService.create(request);
    }

    @Get()
    findAll(): Promise<ProductListResponse[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<ProductFindResponse> {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() changes: ProductUpdateRequest): Promise<ProductUpdateResponse> {
        return this.productsService.update(id, changes);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        this.productsService.delete(id);
    }
}
