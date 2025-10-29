import { IsEnum, IsOptional } from 'class-validator';
import { StatusPagamento } from '../pagamento.entity';

export class UpdatePagamentoDto {
  @IsOptional()
  @IsEnum(StatusPagamento)
  status?: StatusPagamento;
}
