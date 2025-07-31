import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enclos } from './entities/enclos.entity';
import { CreateEnclosDto } from './dto/create-enclos.dto';

@Injectable()
export class EnclosService {
  constructor(
    @InjectRepository(Enclos)
    private readonly enclosRepo: Repository<Enclos>,
  ) {}

  create(dto: CreateEnclosDto) {
    const enclos = this.enclosRepo.create(dto);
    return this.enclosRepo.save(enclos);
  }

  findAll() {
    return this.enclosRepo.find();
  }

  async findOne(id: number) {
    const enclos = await this.enclosRepo.findOneBy({ id });
    if (!enclos) {
      throw new NotFoundException(`Enclos with ID ${id} not found`);
    }
    return enclos;
  }

  async update(id: number, dto: Partial<CreateEnclosDto>) {
    const enclos = await this.findOne(id);
    Object.assign(enclos, dto);
    return this.enclosRepo.save(enclos);
  }

  async delete(id: number) {
    const enclos = await this.findOne(id);
    await this.enclosRepo.remove(enclos);
    return { message: `Enclos with ID ${id} has been deleted` };
  }
} 