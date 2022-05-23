import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const { title, description, ISBN, stock, author } = createBookDto;

    const book = new Book();
    book.title = title;
    book.description = description;
    book.ISBN = ISBN;
    book.stock = stock;
    book.author.id = author;
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    return this.booksRepository.findOne(id);
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    const { author, ...rest } = updateBookDto;
    return this.booksRepository.update(id, {
      ...rest,
      ...(author && { author: { id: author } }),
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.booksRepository.delete(id);
  }
}
