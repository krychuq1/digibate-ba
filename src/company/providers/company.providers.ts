import {DataSource} from "typeorm";
import {Company} from "../entities/company.entity";
import {User} from "../../users/entities/user.entity";
import {BrandIdentity} from "../entities/brand-identity.entity";

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
    },
    {
        provide: 'BRAND_IDENTITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BrandIdentity),
        inject: ['DATA_SOURCE'],
    }
]
