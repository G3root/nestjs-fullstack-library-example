import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author();
    author.name = createAuthorDto.name;
    return this.authorsRepository.save(author);
  }
  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }
  async update(id: number, author: UpdateAuthorDto) {
    return this.authorsRepository.update(id, author);
  }
  async findByID(id: number): Promise<Author> {
    return this.authorsRepository.findOne(id);
  }
}
