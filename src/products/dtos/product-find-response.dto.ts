import { Expose } from "class-transformer";

export class ProductFindResponse{
    @Expose()
    id: number;
    
    @Expose()
    name: string;

    @Expose()
    description: string;

}