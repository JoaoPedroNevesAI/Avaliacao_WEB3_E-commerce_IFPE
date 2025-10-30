import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha!: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
