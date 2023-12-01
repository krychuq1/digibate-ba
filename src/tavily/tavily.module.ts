import { Module } from '@nestjs/common';
import { TavilyService } from './tavily.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [TavilyService],
  exports: [TavilyService]
})
export class TavilyModule {}
