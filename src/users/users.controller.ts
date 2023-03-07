import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/auth/auth.decorater';
const saltOrRounds = 10;


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res){

    const checkUser = await this.usersService.findOneByEmail(createUserDto.email);
    if(checkUser){
      return res.status(HttpStatus.BAD_REQUEST).send({message: 'Email already exits!'});
    }
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto = {...createUserDto, password: hash}
    const data = await this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).send({message: 'User added successfully!', data: data});
  }

  @Get()
  async findAll(@Res() res) {
    const users = await this.usersService.findAll();
    res.status(HttpStatus.OK).send({message: 'User\'s list', data: users});
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const user = await this.usersService.findOne(id);
    return user 
    ? res.status(HttpStatus.OK).send({message: 'User\'s detail', data: user})
    : res.status(HttpStatus.BAD_REQUEST).send({message: 'User not found!', data: user});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    const user = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).send({message: 'User updated successfully!', data: user});
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const user = await this.usersService.remove(id);
    return user ? res.status(HttpStatus.OK).send({message: 'User deleted successfully!', data: user}) : res.status(HttpStatus.BAD_REQUEST).send({message: 'User not deleted!', data: user})
  }

  @Public()
  @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('email') email: string,
    ): Promise<User> {
      console.log('email', email);
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser(
          email,
            hashedPassword,
        );
        return result;
    }
}
