import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard';
import { adminSchema } from './schemas/admin.schema';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name:'User',
        schema:userSchema,
      },
      {
        name:'Admin',
        schema:adminSchema,
      }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret:process.env.JWT_SECRET_KEY || 'your-default-secret', signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy,AuthService,JwtAuthGuard]
})
export class UserModule {}
