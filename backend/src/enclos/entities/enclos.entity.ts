import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Enclos {
  @ApiProperty({ example: 1, description: 'Identifiant unique de l\'enclos' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Enclos des Lions', description: 'Nom de l\'enclos' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Savane', description: 'Type d\'habitat de l\'enclos' })
  @Column()
  habitat: string;

  @ApiProperty({ example: 500, description: 'Superficie de l\'enclos en m²' })
  @Column()
  superficie: number;

  @ApiProperty({ example: 5, description: 'Nombre maximum d\'animaux dans l\'enclos' })
  @Column()
  capacite: number;

  @ApiProperty({ example: true, description: 'Si l\'enclos est actuellement ouvert au public' })
  @Column({ default: true })
  ouvert: boolean;
} 