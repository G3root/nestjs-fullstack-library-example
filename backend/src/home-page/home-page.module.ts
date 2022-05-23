import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
