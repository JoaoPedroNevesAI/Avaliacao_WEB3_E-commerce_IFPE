import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsNumber()
  @Min(0)
  preco!: number;

  @IsNumber()
  @Min(0)
  estoque!: number;

  @IsNumber()
  categoriaId!: number;

  @IsOptional()
  @IsString()
  imagem?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
