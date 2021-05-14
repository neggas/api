import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserPayload } from '../user-model';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  @InjectModel("User") private readonly userModel:Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mechant mechant"
    });

  
  }

  async validate(payload: UserPayload) {
    const {email,username} = payload;
    const user = await this.userModel.findOne({email},{username}).exec();
    if(!user) throw new UnauthorizedException("Veuiller vous identifier");
    return user;
  }
}