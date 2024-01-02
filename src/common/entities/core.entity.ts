import { Field, ObjectType } from '@nestjs/graphql';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field((type) => Number)
    id: number;

    @Column({ default: false })
    @Field((type) => Boolean)
    hidden: boolean;

    @Column({ default: "" })
    @Field((type) => String)
    search: string;

    @CreateDateColumn()
    @Field((type) => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field((type) => Date)
    updatedAt: Date;


}