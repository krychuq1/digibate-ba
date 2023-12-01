import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    companyDescription: string;
    @Column()
    productDescription: string;
    @Column()
    fullBusinessName: string;
    @Column()
    businessName: string;
    @Column()
    industry: string;
    @Column()
    email: string;
    @Column()
    address: string;
}
