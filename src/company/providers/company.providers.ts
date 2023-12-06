import {DataSource} from "typeorm";
import {Company} from "../entities/company.entity";
import {User} from "../../users/entities/user.entity";

export const companyProviders = [
    {
        provide: 'COMPANY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    }
]
