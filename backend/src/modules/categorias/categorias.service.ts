import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  findAll() {
    return this.categoriaRepo.find({ relations: ['produtos'] });
  }

  findOne(id: number) {
    return this.categoriaRepo.findOne({ where: { id }, relations: ['produtos'] });
  }

  create(dto: CreateCategoriaDto) {
    const categoria = this.categoriaRepo.create(dto);
    return this.categoriaRepo.save(categoria);
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    await this.categoriaRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.categoriaRepo.delete(id);
  }
}
