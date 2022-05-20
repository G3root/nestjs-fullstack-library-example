import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'libraryDB',
      synchronize: true,
    }),
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
