import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Simba', description: 'Nom de l\'animal' })
  name: string;

  @ApiProperty({ example: 'Lion', description: 'Espèce de l\'animal' })
  species: string;

  @ApiProperty({ example: 100, description: 'Niveau de santé de l\'animal (0-100)', minimum: 0, maximum: 100, default: 100 })
  health?: number;
}
