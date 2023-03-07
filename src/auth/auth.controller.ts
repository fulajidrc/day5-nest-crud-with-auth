import { Controller, Request, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    //@UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
        //console.log(req);
        return this.authService.login(req.user);
    }
}
