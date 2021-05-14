import { Controller, Get ,UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async profiles(){
        console.log("je suis sur le profile")
    }
}
