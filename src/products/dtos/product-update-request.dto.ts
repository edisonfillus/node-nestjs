import { IsOptional } from "class-validator";

export class ProductUpdateRequest{
   
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

}