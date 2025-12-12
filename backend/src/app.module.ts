import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './modules/produtos/produto.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { EnderecosModule } from './modules/enderecos/enderecos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { PagamentosModule } from './modules/pagamentos/pagamento.module';
import { CarrinhoModule } from './modules/carrinho/carrinho.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Sonic2005#', 
      database: 'avaliacao1', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    ProdutosModule,
    CategoriasModule,
    ClientesModule,
    EnderecosModule,
    PedidosModule,
    PagamentosModule,
    CarrinhoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
