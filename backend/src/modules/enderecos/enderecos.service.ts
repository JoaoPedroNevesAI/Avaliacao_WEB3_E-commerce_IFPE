import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private enderecosRepository: Repository<Endereco>,
  ) {}

  findAll() {
    return this.enderecosRepository.find({ relations: ['cliente'] });
  }

  findOne(id: number) {
    return this.enderecosRepository.findOne({ where: { id }, relations: ['cliente'] });
  }

  create(data: CreateEnderecoDto) {
    const endereco = this.enderecosRepository.create(data);
    return this.enderecosRepository.save(endereco);
  }

  update(id: number, data: UpdateEnderecoDto) {
    return this.enderecosRepository.update(id, data);
  }

  remove(id: number) {
    return this.enderecosRepository.delete(id);
  }
}
