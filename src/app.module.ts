import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://nayeem2281998:JL0wsJEwSFoOIaSA@cluster0.zzzjokj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule
  ]
})
export class AppModule {}
