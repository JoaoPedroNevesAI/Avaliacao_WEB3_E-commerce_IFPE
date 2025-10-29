import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Categoria } from '../categorias/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async findAll(filtro?: { categoriaId?: number; nome?: string; minPreco?: number; maxPreco?: number }) {
    const query = this.produtoRepo.createQueryBuilder('produto').leftJoinAndSelect('produto.categoria', 'categoria');

    if (filtro?.categoriaId) query.andWhere('produto.categoriaId = :id', { id: filtro.categoriaId });
    if (filtro?.nome) query.andWhere('produto.nome ILIKE :nome', { nome: `%${filtro.nome}%` });
    if (filtro?.minPreco) query.andWhere('produto.preco >= :minPreco', { minPreco: filtro.minPreco });
    if (filtro?.maxPreco) query.andWhere('produto.preco <= :maxPreco', { maxPreco: filtro.maxPreco });

    return query.getMany();
  }

  async findOne(id: number) {
    const produto = await this.produtoRepo.findOne({ where: { id }, relations: ['categoria'] });
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }

  async create(dto: CreateProdutoDto) {
    const categoria = await this.categoriaRepo.findOne({ where: { id: dto.categoriaId } });
    if (!categoria) throw new BadRequestException('Categoria inválida');

    const produto = this.produtoRepo.create({ ...dto, categoria });
    return this.produtoRepo.save(produto);
  }

  async update(id: number, dto: UpdateProdutoDto) {
    const produto = await this.findOne(id);
    if (dto.categoriaId) {
      const categoria = await this.categoriaRepo.findOne({ where: { id: dto.categoriaId } });
      if (!categoria) throw new BadRequestException('Categoria inválida');
      produto.categoria = categoria;
    }
    Object.assign(produto, dto);
    return this.produtoRepo.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    return this.produtoRepo.remove(produto);
  }
}
