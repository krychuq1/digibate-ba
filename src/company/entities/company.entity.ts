import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(() => User, user => user.companies)
    user: User;

    @Column("text")
    companyDescription: string;
    @Column("text")
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
