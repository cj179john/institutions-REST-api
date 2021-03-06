import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Institution } from './Institution';
import { Subject } from './Subject';

@Entity({ tableName: 'submissions' })
export class Submission {
  @PrimaryKey()
  primaryId!: number;

  @Property()
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
  institutionId: string;

  @OneToMany(() => Subject, (subject) => subject.submission)
  subjects = new Collection<Subject>(this);

  @ManyToOne(() => Institution)
  institution?: Institution;
}
