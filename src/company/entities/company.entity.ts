import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {BrandIdentity} from "./brand-identity.entity";

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
    // One-to-one relationship with BrandIdentity
    @OneToOne(() => BrandIdentity, brandIdentity => brandIdentity.company,  { nullable: true })
    @JoinColumn() // This decorator is needed to specify the owner side of the relationship
    brandIdentity: BrandIdentity;

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
