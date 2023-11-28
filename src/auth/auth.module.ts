import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: 'testing',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService]
})
export class AuthModule {}
