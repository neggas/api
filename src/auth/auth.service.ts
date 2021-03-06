import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInfosDto } from './dto/register.dto';
import { User } from './user-model';
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User") private readonly UserModel : Model<User>,
        private readonly jwtService:JwtService
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


    async LoginUser(user_login) {
        const {email, password} = user_login;
        const user = await this.UserModel.findOne({email: email})
        
        if (!user) throw new NotFoundException("Cet utilisateur n'existe pas !");
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new NotFoundException("Mot de passe incorrect !"); 
        } else {

            const payload ={email:user.email,username:user.username};
            const jwt = await this.jwtService.sign(payload);

            return {
                "access_token":jwt
            }
           
        }
    }
}
