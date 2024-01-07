import { Module } from '@nestjs/common';
import { WaitingListController } from './waiting-list.controller';
import { WaitingListService } from './waiting-list.service';
import {DatabaseModule} from "../database/database.module";
import {waitingListProviders} from "./providers/waiting-list.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [WaitingListController],
  providers: [WaitingListService, ...waitingListProviders]
})
export class WaitingListModule {}
