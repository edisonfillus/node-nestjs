import { Expose } from "class-transformer";

export class ProductListResponse {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;
}