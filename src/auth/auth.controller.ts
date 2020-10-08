import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}
