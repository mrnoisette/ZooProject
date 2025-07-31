import { ApiProperty } from '@nestjs/swagger';

export class CreateEnclosDto {
  @ApiProperty({ example: 'Enclos des Lions', description: 'Nom de l\'enclos' })
  name: string;

  @ApiProperty({ example: 'Savane', description: 'Type d\'habitat de l\'enclos' })
  habitat: string;

  @ApiProperty({ example: 500, description: 'Superficie de l\'enclos en m²' })
  superficie: number;

  @ApiProperty({ example: 5, description: 'Nombre maximum d\'animaux dans l\'enclos' })
  capacite: number;

  @ApiProperty({ example: true, description: 'Si l\'enclos est actuellement ouvert au public', default: true })
  ouvert?: boolean;
} 