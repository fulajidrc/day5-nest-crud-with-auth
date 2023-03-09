import { Controller, Request, Post, UseGuards, Body, Req, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Public } from './auth.decorater';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { loginResponse, signupResponse, verifyResponse } from './res';
import { bedResponse, ForbiddenResponse, UnauthorizedResponse } from 'src/response_type';
import { SignupDto } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')

export class AuthController {
    constructor(
        private readonly authService: AuthService, 
        private usersService: UsersService
    ) { }

    @Public()
    @Post('/signup')
    @ApiBody({type: SignupDto})
    @ApiResponse(signupResponse)
    @ApiResponse({...bedResponse})
    async createUser(
        @Body() signupDto: SignupDto,
        @Res() res
    ): Promise<User> {

        const checkUser = await this.usersService.findOneByEmail(signupDto.email)
        if(checkUser){
            return res.status(400).json({message: 'Email already exits!'})
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(signupDto.password, saltOrRounds);
        const result = await this.usersService.createUser({...signupDto, password: hashedPassword});
        return result
        ? res.status(201).json({message: 'Signup successfully!', data: result})
        : res.status(400).json({message: 'User not added!'})
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ApiBody({ type: LoginDto })
    @ApiResponse(loginResponse)
    // @ApiResponse(bedResponse)
     @ApiResponse(ForbiddenResponse)
     @ApiResponse(UnauthorizedResponse)
    async login(@Request() req) {
        const tokenData = await this.authService.login(req.user);
        return {message: 'User login', data: tokenData}
    }

    
    @ApiResponse(verifyResponse)
    @ApiResponse(ForbiddenResponse)
    @ApiResponse(UnauthorizedResponse)
    @Get('profile')
    @ApiBearerAuth('Bearer')
    getProfile(@Request() req, @Res() res) {
        return res.status(200).json({message: 'User verify!', data: req.user})
    }
}
