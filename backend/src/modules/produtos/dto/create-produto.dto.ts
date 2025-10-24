import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  @IsOptional()
  estoque?: number;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}
