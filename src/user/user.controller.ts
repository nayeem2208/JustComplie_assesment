import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service'
import {UserDto} from './user.dto'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    public  getUser() {
        return this.userService.getUsers();
    }

    @Post()
    public async postUser(@Body() user:UserDto){
        return this.userService.postUser(user)
    }

    @Get(':id')
    public async getUserbyId(@Param('id') id:number){
        return this.userService.getUserById(id)
    }

    @Delete(':id')
    public async deleteById(@Param('id') id:number){
         this.userService.deleteById(id)
    }

    @Put(':id')
    public async updateUser(@Param('id') id:number,@Query() query){
        let propertyName=query.propertyName
        let propertyValue=query.propertyValue
        return this.userService.updateUser(id,propertyName,propertyValue)
    }

}
