import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtosRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtosRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }

  async create(data: CreateProdutoDto): Promise<Produto> {
    const novoProduto = this.produtosRepository.create(data);
    return this.produtosRepository.save(novoProduto);
  }

  async update(id: number, data: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    Object.assign(produto, data);
    return this.produtosRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtosRepository.remove(produto);
  }
}
