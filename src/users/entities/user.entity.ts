import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {Profile} from "./profile.entity";
import {Company} from "../../company/entities/company.entity";

@Entity()
export class User {
    @PrimaryColumn()
    email: string;
    @OneToMany(() => Company, company => company.user)
    companies: Company[];
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}
