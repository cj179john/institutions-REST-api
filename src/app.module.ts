import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessImpl } from './dataAccess.service';
import DataModule from './db.module';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService, DataAccessImpl],
})
export class AppModule {}
