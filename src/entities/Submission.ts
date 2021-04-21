import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Institution } from './Institution';
import { Subject } from './Subject';

@Entity({ tableName: 'submissions' })
export class Submission {
  @PrimaryKey()
  _id!: number;

  @Unique()
  id!: string;

  @Property()
  year!: number;

  @Property()
  studentTotal: number;

  @Property()
  undergraduatesTotal: number;

  @Property()
  postgraduatesTotal: number;

  @Property()
  staffTotal: number;

  @Property()
  academicPapers: number;

  @Property()
  institutionIncome: number;

  @Property()
  InstitutionId: number;

  @OneToMany(() => Subject, (subject) => subject.name)
  subjects = new Collection<Subject>(this);

  @ManyToOne(() => Institution, { nullable: true })
  institution?: Institution;
}
