import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import {OpenAiModule} from "../open-ai/open-ai.module";
import {CompanyModule} from "../company/company.module";
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [OpenAiModule, CompanyModule, HttpModule, UsersModule]
})
export class ContentModule {}
