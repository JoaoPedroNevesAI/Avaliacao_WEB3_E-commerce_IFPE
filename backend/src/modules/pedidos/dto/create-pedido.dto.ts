import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class ItemPedidoDto {
  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantidade: number;
}

export class CreatePedidoDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  enderecoId: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  itens: ItemPedidoDto[];
}
