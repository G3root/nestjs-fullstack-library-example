import { Controller, Get } from '@nestjs/common';
import { HomePageService } from './home-page.service';

@Controller('home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}
  @Get()
  findAllBooksAndAuthors() {
    return this.homePageService.findAllBooksAndAuthors();
  }
}
