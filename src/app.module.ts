import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { NotesModule } from './notes/notes.module';
import * as winston from 'winston';
@Module({
  imports: [CommonModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  WinstonModule.forRoot({
    format:winston.format.json(),
    level: 'debug',
    transports: [new winston.transports.Console()],
  }),
  NotesModule  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
