import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Profile} from "./profile.entity";

@Entity()
export class User {
    @PrimaryColumn()
    email: string;
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}
