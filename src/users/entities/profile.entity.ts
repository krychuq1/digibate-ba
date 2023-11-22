import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    familyName: string;
}
