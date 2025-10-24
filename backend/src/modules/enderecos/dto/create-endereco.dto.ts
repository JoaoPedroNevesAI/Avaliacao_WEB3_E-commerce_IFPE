import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty()
  @IsString()
  rua: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsOptional()
  @IsBoolean()
  padrao?: boolean;
}
