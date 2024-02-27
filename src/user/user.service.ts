import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { UserDto } from './user.dto';
import { IAdmin } from './interface/admin.interface';

interface UpdateUserData {
    id: number;
    properties: Record<string, string>;
  }

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModal: Model<IUser>,
        @InjectModel('Admin') private readonly adminModal: Model<IAdmin>
    ) { }

    public async getUserByUsername(username: string): Promise<any> {
        const admin = await this.adminModal.find({ username}).exec();
        if (admin) {
          return admin;
        }
    }

    public async getUsers(): Promise<UserDto[]> {
        let user = await this.userModal.find().exec()
        if (!user || !user[0]) {
            throw new HttpException('Not found', 404)
        }
        return user
    }

    public async postUser(newUser: UserDto) {
        console.log(newUser,'newuser')
        let userExist=await this.userModal.find({id:newUser.id})
        if(userExist.length>0){
            throw new HttpException('User already Exist',401)
        }
        let user = await new this.userModal(newUser)
        return user.save()
    }

    public async getUserById(id: number): Promise<any> {
        let user = await this.userModal.findOne({ id }).exec()
        if (!user) {
            throw new HttpException('Not found', 404)
        }
        return user
    }

    public async deleteById(id: number): Promise<any> {
        let user = await this.userModal.deleteOne({ id }).exec()
        if (user.deletedCount === 0) {
            throw new HttpException('Not found', 404)
        }
        return user
    }

    public async updateUser(updateUserData: UpdateUserData): Promise<UserDto> {
        const { id, properties } = updateUserData;
        const updateQuery = { $set:{ name:properties.newName,age:properties.newage,place:properties.newplace }};
        const options = { new: true };
        const user = await this.userModal.findOneAndUpdate({ id }, updateQuery, options).exec();

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return user;
    }
}
