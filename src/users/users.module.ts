import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {HttpModule} from "@nestjs/axios";
import {userProviders} from "./providers/user.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [UsersController],
  providers: [ ...userProviders, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
