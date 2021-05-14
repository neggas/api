import { Body, Controller,Get ,Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfosDto } from './dto/register.dto';
import { User } from './user-model';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post("register")
    Register(@Body() user_infos:UserInfosDto){
       const response = this.authService.RegisterUser(user_infos);
       return response;
    }
}

