import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class WaitingList {
    @PrimaryColumn()
    email: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt?: Date;
    @BeforeInsert()
    updateDateCreation() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    @BeforeUpdate()
    updateDateUpdate() {
        this.updatedAt = new Date();
    }
}
