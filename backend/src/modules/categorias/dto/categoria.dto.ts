import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}

export class UpdateCategoriaDto extends CreateCategoriaDto {}
