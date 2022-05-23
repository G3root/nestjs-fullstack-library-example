import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}
  async findAllBooksAndAuthors() {
    const books = await this.booksRepository.find({ relations: ['author'] });
    const authors = await this.authorRepository.find();
    return { books, authors };
  }
}
