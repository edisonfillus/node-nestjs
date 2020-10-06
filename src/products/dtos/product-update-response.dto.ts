import { Expose } from "class-transformer";

export class ProductUpdateResponse{

    @Expose()
    id: number;
    
    @Expose()
    name: string;

    @Expose()
    description: string;

}