// animaux.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Injectable()
export class AnimauxService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepo: Repository<Animal>,
  ) {}

  create(dto: CreateAnimalDto) {
    const animal = this.animalRepo.create(dto);
    return this.animalRepo.save(animal);
  }

  findAll() {
    return this.animalRepo.find();
  }

  async findOne(id: number) {
    const animal = await this.animalRepo.findOneBy({ id });
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  findByName(name: string) {
    return this.animalRepo.findOneBy({ name });
  }

  async delete(id: number) {
    const animal = await this.findOne(id);
    await this.animalRepo.remove(animal);
    return { message: `Animal with ID ${id} has been deleted` };
  }

  async soignerAnimal(id: number) {
    const animal = await this.findOne(id);
    animal.health = 100;
    return this.animalRepo.save(animal);
  }
}
