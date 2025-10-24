import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find({ relations: ['produtos'] });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
    if (!categoria) throw new NotFoundException('Categoria não encontrada');
    return categoria;
  }

  async create(data: CreateCategoriaDto): Promise<Categoria> {
    const novaCategoria = this.categoriasRepository.create(data);
    return this.categoriasRepository.save(novaCategoria);
  }

  async update(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, data);
    return this.categoriasRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriasRepository.remove(categoria);
  }
}
