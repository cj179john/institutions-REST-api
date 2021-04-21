import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Submission } from './Submission';

@Entity({ tableName: 'institutions' })
export class Institution {
  @PrimaryKey()
  _id!: number;

  @Unique()
  id!: string;

  @Property()
  name!: string;

  @Property()
  address: string;

  @Property()
  country: string;

  @Property()
  region: string;

  @OneToMany(() => Submission, (submission) => submission.InstitutionId)
  submissions = new Collection<Submission>(this);

  constructor(institution: Institution) {
    this.id = institution.id;
    this.name = institution.name;
    this.address = institution.address;
    this.country = institution.country;
    this.region = institution.region;
  }
}
