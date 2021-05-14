import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user-model';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from "@nestjs/passport";
import { JwtStrategy } from './strategy/passport-jwt.strategy';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
  PassportModule.register({
    defaultStrategy:'jwt'
  }),
  JwtModule.register({
    secret:"mechant mechant",
      signOptions:{
        expiresIn:3600
      }
  })

],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
