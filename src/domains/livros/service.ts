import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';
import { Livro } from './model';

@Injectable()
export class LivrosService {
  constructor(
    @InjectModel(Livro)
    private livroModel: typeof Livro,
  ) {}

  async findAll(): Promise<Livro[]> {
    return this.livroModel.findAll();
  }

  async get(id: number): Promise<Livro> {
    return this.livroModel.findByPk(id);
  }

  async create(livro: Livro): Promise<Livro> {
    return this.livroModel.create(livro);
  }

  async update(livro: Livro): Promise<Livro> {
    const livroQuery: Livro = await this.get(livro.id);
    if (!livroQuery) {
      throw new NotFoundException('Livro não cadastrado.');
    }

    await this.livroModel.update(livro, {
      where: {
        id: Number(livro.id),
      },
    });

    return this.livroModel.findByPk(livro.id);
  }

  async destroy(id: number) {
    const livro: Livro = await this.get(id);
    if (!livro) {
      throw new NotFoundException('Livro não cadastrado.');
    }
    livro.destroy();

    response.sendStatus(204);
  }
}
