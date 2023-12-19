import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class BrandIdentity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("simple-array")
    brandAttributes: string[];

    @Column("simple-array")
    mainColors: string[];

    @Column("simple-array")
    secondaryColors: string[];
    @Column()
    slogan: string;
    @Column()
    font: string;

    @Column("text")
    toneOfVoice: string;

    @OneToOne(() => Company, company => company.brandIdentity) // inverse side
    company: Company;
}

