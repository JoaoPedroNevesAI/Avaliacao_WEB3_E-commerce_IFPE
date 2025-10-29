import { IsNumber, IsEnum } from 'class-validator';
import { MetodoPagamento } from '../pagamento.entity';

export class CreatePagamentoDto {
  @IsNumber()
  pedidoId: number;

  @IsEnum(MetodoPagamento)
  metodo: MetodoPagamento;

  @IsNumber()
  valor: number;
}
