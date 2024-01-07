import {DataSource} from "typeorm";
import {WaitingList} from "../entities/waiting-list.entity";

export const waitingListProviders = [
    {
        provide: 'WAITING_LIST_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(WaitingList),
        inject: ['DATA_SOURCE'],
    },
]
