import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInfosDto } from './dto/register.dto';
import { User } from './user-model';
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User") private readonly UserModel : Model<User> 
    ){}


    async RegisterUser(user_infos:User|UserInfosDto){

        const {username ,email} = user_infos;

        let user = await this.UserModel.findOne({username,email}).exec();

        if(user) throw new ConflictException("l'email ou le username existe !");

        if(!(user_infos.confirm_password === user_infos.password)) return {code:404,staus:"false",message:"les mot de passe ne sont pas identique"}

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user_infos.password, salt);
        user_infos.password = hash;

        user = new this.UserModel({...user_infos});
        user = await user.save();

        if(!user) throw new NotFoundException("Mauvaise informations")
        return user;
    }
}
