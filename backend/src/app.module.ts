import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}