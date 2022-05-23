import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const { title, description, ISBN, stock, author: authorID } = createBookDto;
    const author = new Author();
    author.id = authorID;

    const book = new Book();
    book.title = title;
    book.description = description;
    book.ISBN = ISBN;
    book.stock = stock;
    book.author = author;
    return this.booksRepository.save(book);
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
