import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {TavilyModule} from "../tavily/tavily.module";
import {DatabaseModule} from "../database/database.module";
import {companyProviders} from "./providers/company.providers";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
  imports: [TavilyModule, DatabaseModule]
})
export class CompanyModule {}
