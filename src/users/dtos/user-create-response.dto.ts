import { Expose } from "class-transformer";

export class UserCreateResponse {
    @Expose()
    id: number;

    @Expose()
    name: string;
    
    @Expose()
    email: string;
}