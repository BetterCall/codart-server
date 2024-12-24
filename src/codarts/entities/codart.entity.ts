/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  RelationId,
} from 'typeorm';

// @ts-ignore
const { v4: uuidv4 } = require('uuid');
import { CoreEntity } from 'src/common/entities/core.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@InputType('CodartInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Codart extends CoreEntity {
  @Column()
  @Field((type) => String)
  name: string;

  @Column({ unique: true })
  @Field((type) => String)
  code: string;

  @Column()
  @Field((type) => String)
  publicLink: string;

  @Column()
  @Field((type) => String)
  hiddenLink: string;

  @Field((type) => Artist)
  @ManyToOne((type) => Artist, (artist) => artist.codarts, {
    onDelete: 'CASCADE',
  })
  artist: Artist;

  @RelationId((Codart: Codart) => Codart.artist)
  @Column()
  @Field((type) => Number)
  artistId: number;

  @BeforeInsert()
  @BeforeUpdate()
  async setSearch() {
    this.search = this.name.toLowerCase();
  }

  @BeforeInsert()
  async createCode() {
    let uuid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    let code = uuid.split('-')[0];
    this.code = code;
  }
}
