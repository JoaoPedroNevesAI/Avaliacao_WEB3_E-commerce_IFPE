import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { EnderecosModule } from './modules/enderecos/enderecos.module';
import { PedidoModule } from './modules/pedidos/pedidos.module';
import { PagamentosModule } from './modules/pagamentos/pagamentos.module';
import { CarrinhoModule } from './modules/carrinho/carrinho.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sonic2005#', 
      database: 'Avaliação1', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    ProdutosModule,
    CategoriasModule,
    ClientesModule,
    EnderecosModule,
    PedidoModule,
    PagamentosModule,
    CarrinhoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
