import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { Author } from './entities/author.entity';
import { AuthorService } from './author.service';
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }
  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }
}
