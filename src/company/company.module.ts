import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {DatabaseModule} from "../database/database.module";
import {companyProviders} from "./providers/company.providers";
import {HttpModule} from "@nestjs/axios";
import {OpenAiModule} from "../open-ai/open-ai.module";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
  exports: [CompanyService],
  imports: [DatabaseModule, OpenAiModule, HttpModule]
})
export class CompanyModule {}
