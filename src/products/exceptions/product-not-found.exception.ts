import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFoundException extends HttpException {
    constructor(id: number) {
        super("No product found with id: " + id, HttpStatus.NOT_FOUND);
    }
}