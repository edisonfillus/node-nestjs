import { Expose } from "class-transformer";

export class ProductCreateResponse{

    @Expose()
    id: number;
    
    @Expose()
    name: string;
    
    @Expose()
    description: string;

}