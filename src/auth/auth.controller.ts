import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {IGoogleUser} from "../users/dto/google-user";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService, private authService: AuthService) {
    }
    @Get('/google/')
    async googleLogin(@Req() req, @Res() res) {
        this.userService.googleUser(req.query.access_token).subscribe({
            next: async (axiosResponse) => {
                // Assuming that the data property of axiosResponse is of type IGoogleUser
                const googleUser: IGoogleUser = axiosResponse.data;
                // Now pass the extracted googleUser to loginGoogleUser
                const user = await this.userService.loginGoogleUser(googleUser);
                res.send(await this.authService.googleToken(user.email));
            },
            error: (err) => {
                res.status(400).send(err);
            }
        });
    }
    @UseGuards(AuthGuard)
    @Get('userInfo')
    async getUserInfo(@Req() req, @Res() res) {
        try{
            console.log('here getting info', req.user);
            res.send(await this.userService.getUser(req.user.email));
        } catch (e) {
            res.status(400).send(e);
        }

    }

}
