import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { StatusPedido } from '../status-pedido.enum';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
  status?: StatusPedido;
}
