import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoController } from './endereco.controller';

describe('EnderecosController', () => {
  let controller: EnderecoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoController],
    }).compile();

    controller = module.get<EnderecoController>(EnderecoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
