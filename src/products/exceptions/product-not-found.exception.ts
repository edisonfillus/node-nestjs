import { NotFoundException } from "@nestjs/common";

export class ProductNotFoundException extends NotFoundException  {
    constructor(id: number) {
        super("No product found with id: " + id);
    }
}