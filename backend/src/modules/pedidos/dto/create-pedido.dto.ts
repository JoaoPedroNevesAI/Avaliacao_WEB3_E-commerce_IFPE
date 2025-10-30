import { IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class ItemPedidoDto {
  @IsNumber()
  produtoId!: number;

  @IsNumber()
  quantidade!: number;
}

export class CreatePedidoDto {
  @IsNumber()
  clienteId!: number;

  @IsArray()
  @ArrayMinSize(1)
  itens!: ItemPedidoDto[];
}
