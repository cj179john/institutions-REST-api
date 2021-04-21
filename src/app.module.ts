import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppServiceImpl } from './app.service';
import { DataAccessImpl } from './dataAccess.service';
import DataModule from './db.module';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppServiceImpl, DataAccessImpl],
})
export class AppModule {}
