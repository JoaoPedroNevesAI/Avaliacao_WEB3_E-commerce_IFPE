import { IsEnum } from 'class-validator';
import { StatusPagamento } from '../pagamento.entity';

export class UpdatePagamentoDto {
  @IsEnum(StatusPagamento)
  status: StatusPagamento;
}
