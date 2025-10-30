import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  nome!: string;

  @IsString()
  descricao!: string;
}
