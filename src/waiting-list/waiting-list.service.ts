import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {WaitingList} from "./entities/waiting-list.entity";

@Injectable()
export class WaitingListService {
    constructor(@Inject('WAITING_LIST_REPOSITORY')
                private waitingListRepository: Repository<WaitingList>) {
    }
    async addToWaitingList(email: string): Promise<WaitingList> {
        const waitingList = new WaitingList();
        waitingList.email = email;
        return await this.waitingListRepository.save(waitingList);
    }
}
