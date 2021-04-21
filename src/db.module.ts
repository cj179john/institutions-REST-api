import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Institution } from './entities/Institution';
import { Subject } from './entities/Subject';
import { Submission } from './entities/Submission';

const DataModule = MikroOrmModule.forRoot({
  entities: [Institution, Submission, Subject],
  entitiesTs: ['./src/entities'],
  type: 'postgresql',
  dbName: 'institution-data',
  host: 'localhost',
  port: 5432,
});

export default DataModule;
