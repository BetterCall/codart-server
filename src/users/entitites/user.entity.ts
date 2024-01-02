import { InternalServerErrorException } from "@nestjs/common";
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";

import * as bcrypt from 'bcrypt';

import { CoreEntity } from "src/common/entities/core.entity";

export enum UserRole {
    Admin = 'Admin',
    Employee = 'Employee',
    Client = "Client"
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Column({ default: "" })
    @Field(type => String)
    @IsString()
    firstname: string

    @Column({ default: "" })
    @Field(type => String)
    @IsString()
    lastname: string

    @Column()
    @Field(type => String)
    @IsEmail()
    email: string

    @Column({ default: "" })
    @Field(type => String)
    @IsString()
    phone: string

    @Column()
    @Field(type => String)
    @IsString()
    password: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Employee })
    @Field((type) => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @BeforeInsert()
    async createPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(`${this.lastname[0]}_${this.firstname}`, 10);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        console.log(
            this
        )
        if (this.password) {
            try {
                console.log('password ', this.password)
                this.password = await bcrypt.hash(this.password, 10);
            } catch (e) {
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        const ok = await bcrypt.compare(aPassword, this.password);
        console.log('ok ', ok)
        if (!ok) {
            throw new InternalServerErrorException();
        }
        return ok;
    }
}