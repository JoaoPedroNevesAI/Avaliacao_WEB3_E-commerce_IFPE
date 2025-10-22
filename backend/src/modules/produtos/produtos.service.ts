import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProdutoDto, UpdateProdutoDto } from './dto/produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
  ) {}

  findAll() {
    return this.produtoRepo.find({ relations: ['categoria'] });
  }

  findOne(id: number) {
    return this.produtoRepo.findOne({ where: { id }, relations: ['categoria'] });
  }

  create(dto: CreateProdutoDto) {
    const produto = this.produtoRepo.create(dto);
    return this.produtoRepo.save(produto);
  }

  async update(id: number, dto: UpdateProdutoDto) {
    await this.produtoRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.produtoRepo.delete(id);
  }
}