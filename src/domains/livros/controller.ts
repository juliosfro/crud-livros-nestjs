import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Livro } from './model';
import { LivrosService } from './service';

@Controller('livros')
export class LivrosController {
  constructor(private livrosService: LivrosService) {}

  @Get()
  async findAll(): Promise<Livro[]> {
    return this.livrosService.findAll();
  }

  @Get(':id')
  async get(@Param() params): Promise<Livro> {
    return this.livrosService.get(params.id);
  }

  @Post()
  create(@Body() livro: Livro): Promise<Livro> {
    console.log(Livro);
    return this.livrosService.create(livro);
  }

  @Put()
  update(@Body() livro: Livro): Promise<Livro> {
    return this.livrosService.update(livro);
  }

  @Delete(':id')
  @HttpCode(204)
  destroy(@Param() params) {
    return this.livrosService.destroy(params.id);
  }
}
