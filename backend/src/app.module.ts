import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';
import { Book } from './book/entities/book.entity';
import { HomePageModule } from './home-page/home-page.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'library.db',
      entities: [Author, Book, User],
      synchronize: true,
    }),
    AuthorModule,
    HomePageModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
