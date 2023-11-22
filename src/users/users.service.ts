import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import * as process from "process";
import {raw, response} from "express";
import {map} from "rxjs";
import {IGoogleUser} from "./dto/google-user";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {Profile} from "./entities/profile.entity";

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService,
                @Inject('USER_REPOSITORY')
                private userRepository: Repository<User>,
                @Inject('PROFILE_REPOSITORY')
                private profileRepository: Repository<Profile>,
                ) {}
     googleUser(token: string) {
        // get user info from token
       return this.httpService.get(process.env.GOOGLE_API, {params: {id_token: token}})
    }
    async loginGoogleUser(googleUser: IGoogleUser): Promise<User> {
        const user = await this.userRepository.findOne({where: {email: googleUser.email}});
        // check if user exist
        if(await this.userRepository.findOne({where: {email: googleUser.email}})) {
            return user;
        } else{
            const profile = new Profile();
            profile.name = googleUser.name;
            profile.familyName = googleUser.family_name;
            const savedProfile = await this.profileRepository.save(profile);
            const user = new User();
            user.email = googleUser.email;
            user.profile = savedProfile;
            return await this.userRepository.save(user);
        }

    }
    async getUser(email: string): Promise<User> {
        return await this.userRepository.findOne({where: {email}, relations: ['profile']})
    }
}
