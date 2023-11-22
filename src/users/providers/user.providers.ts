import {DataSource} from "typeorm";
import {User} from "../entities/user.entity";
import {Profile} from "../entities/profile.entity";

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROFILE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
        inject: ['DATA_SOURCE']
    },
]
