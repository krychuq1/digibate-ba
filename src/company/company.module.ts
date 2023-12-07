import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {TavilyModule} from "../tavily/tavily.module";
import {DatabaseModule} from "../database/database.module";
import {companyProviders} from "./providers/company.providers";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
  imports: [TavilyModule, DatabaseModule, HttpModule]
})
export class CompanyModule {}
