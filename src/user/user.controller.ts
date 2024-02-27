import { Body, Controller, Delete, Get, Param, Post, Put, Query,UseGuards  } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
    private readonly authService: AuthService,) { }

    @Post('signin')
    public async signIn(@Body('username') username: string, @Body('password') password: string) {
        return this.authService.signIn(username, password);
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    public getUser() {
        return this.userService.getUsers();
    }

    @Post()
    // @UseGuards(JwtAuthGuard)
    public async postUser(@Body() user: UserDto) {
        return this.userService.postUser(user)
    }

    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    public async getUserbyId(@Param('id') id: number) {
        return this.userService.getUserById(id)
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    public async deleteById(@Param('id') id: number) {
        console.log(id,'id ivda ethi')
        this.userService.deleteById(id)
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    public async updateUser(@Param('id') id: number, @Body() body: any) {
        return this.userService.updateUser({ id, properties: body });
    }
    

}
