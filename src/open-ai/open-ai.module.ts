import { Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  providers: [OpenAiService],
  exports: [OpenAiService],
  imports: [HttpModule]
})
export class OpenAiModule {

}
