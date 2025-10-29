import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsOptional()
  @IsBoolean()
  principal?: boolean;

  @IsNumber()
  clienteId: number;
}
