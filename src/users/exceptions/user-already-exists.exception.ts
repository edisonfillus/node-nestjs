import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException{
    constructor(email: string){
        super("User already exists with email: "+ email, HttpStatus.BAD_REQUEST);
    }
}