import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Submission } from './Submission';

@Entity({ tableName: 'subjects' })
export class Subject {
  @PrimaryKey()
  _id!: number;

  @Property()
  name: string;

  @Property()
  academicPapers: number;

  @Property()
  studentTotal: number;

  @Property()
  studentRating: number;

  @ManyToOne(() => Submission, { nullable: true })
  Submission?: Submission;
}
