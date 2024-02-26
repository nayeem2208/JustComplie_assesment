import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { UserDto } from './user.dto';
import { IAdmin } from './interface/admin.interface';

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

    public async updateUser(id: number, propertyName: string, propertyValue: string): Promise<UserDto> {
        const updateQuery = { $set: { [propertyName]: propertyValue } };
        const options = { new: true };

        const user = await this.userModal.findOneAndUpdate({ id }, updateQuery, options).exec();

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return user;
    }
}
