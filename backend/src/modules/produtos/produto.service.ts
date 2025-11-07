import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    private readonly produtoRepo: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async findAll(filtro?: {
    categoriaId?: number;
    nome?: string;
    minPreco?: number;
    maxPreco?: number;
  }) {
    const query = this.produtoRepo
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.categoria', 'categoria');

    if (filtro?.categoriaId) {
      query.andWhere('categoria.id = :categoriaId', {
        categoriaId: filtro.categoriaId,
      });
    }

    if (filtro?.nome) {
      query.andWhere('produto.nome ILIKE :nome', {
        nome: `%${filtro.nome}%`,
      });
    }

    if (filtro?.minPreco) {
      query.andWhere('produto.preco >= :minPreco', {
        minPreco: filtro.minPreco,
      });
    }

    if (filtro?.maxPreco) {
      query.andWhere('produto.preco <= :maxPreco', {
        maxPreco: filtro.maxPreco,
      });
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const produto = await this.produtoRepo.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async create(dto: CreateProdutoDto) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: dto.categoriaId },
    });
    if (!categoria) {
      throw new BadRequestException('Categoria inválida');
    }

    const produto = this.produtoRepo.create({
      ...dto,
      estoque: dto.estoque ?? 0,
      categoria,
    });

    return this.produtoRepo.save(produto);
  }

  async update(id: number, dto: UpdateProdutoDto) {
    const produto = await this.findOne(id);

    if (dto.categoriaId) {
      const categoria = await this.categoriaRepo.findOne({
        where: { id: dto.categoriaId },
      });
      if (!categoria) {
        throw new BadRequestException('Categoria inválida');
      }
      produto.categoria = categoria;
    }

    Object.assign(produto, dto);
    return this.produtoRepo.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    return this.produtoRepo.remove(produto);
  }

  async verificarEstoque(id: number) {
    const produto = await this.findOne(id);
    if (produto.estoque <= 0) {
      throw new BadRequestException('Produto sem estoque');
    }
    return { id: produto.id, nome: produto.nome, estoque: produto.estoque };
  }

  async reduzirEstoque(id: number, quantidade: number) {
    if (!quantidade || quantidade <= 0) {
      throw new BadRequestException('Quantidade inválida');
    }

    const produto = await this.findOne(id);

    if (produto.estoque < quantidade) {
      throw new BadRequestException('Estoque insuficiente');
    }

    produto.estoque -= quantidade;
    await this.produtoRepo.save(produto);

    return {
      message: `Estoque atualizado com sucesso. Novo estoque: ${produto.estoque}`,
      novoEstoque: produto.estoque,
    };
  }
}
