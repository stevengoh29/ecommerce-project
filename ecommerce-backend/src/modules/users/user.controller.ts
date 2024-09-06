import { Body, Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ResponseUtil } from 'src/utils/response.util';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
    builder = new ResponseUtil();

    constructor(
        private usersService: UsersService,
    ) { }

    @Get()
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        const [users, meta] = await this.usersService.getUsers()
        return this.builder.buildResponse(res, users, meta);
    }

    @Post('/login')
    async doLogin(
        @Body() loginCredential: { username: string, password: string },
        @Res() res: Response
    ) {
       const user = await this.usersService.getUserByUsernameAndPassword(loginCredential.username, loginCredential.password)
       return this.builder.buildResponse(res, user) 
    }

    @Post()
    async addUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Res() res: Response
    ) {
        const user = await this.usersService.addUser(createUserDto)
        return this.builder.buildResponse(res, user)
    }
}