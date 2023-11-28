import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, DatabaseModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
