import { HttpException, Injectable } from '@nestjs/common';
import { Users } from './user.Data'

@Injectable()
export class UserService {
    private users = Users
    public getUsers() {
        return this.users
    }

    public postUser(user) {
        return this.users.push(user)
    }

    public getUserById(id: number): Promise<any> {
        let userId = Number(id)
        return new Promise((resolve) => {
            let user = this.users.find((user) => user.id === userId)
            if (!user) {
                throw new HttpException('Not found', 404)
            }
            return resolve(user)
        })

    }

    public deleteById(id: number): Promise<any> {
        let userId = Number(id)
        return new Promise((resolve) => {
            let index = this.users.findIndex((user) => user.id === userId)
            if (index === -1) {
                throw new HttpException('Not found', 404)
            }
            this.users.splice(index, 1)
            return resolve(this.users)
        })
    }

    public updateUser(id: number, propertyName: string, propertyValue: string):Promise<any> {
        let userId=Number(id)
        return new Promise((resolve)=>{ 
        let index = this.users.findIndex((user) => user.id === userId)
        if (index === -1) {
            throw new HttpException('Not found', 404)
        }
        this.users[index][propertyName] = propertyValue
        return resolve(this.users)
    })
    }
}
