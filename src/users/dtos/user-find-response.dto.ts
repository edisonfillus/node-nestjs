import {Expose} from "class-transformer";

export class UserFindResponse {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;
}