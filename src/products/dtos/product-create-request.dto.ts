import { IsNotEmpty, IsOptional } from "class-validator";

export class ProductCreateRequest{

    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

}