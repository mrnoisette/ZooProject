// animaux.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AnimauxService } from './animaux.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('animaux')
@Controller('animaux')
export class AnimauxController {
  constructor(private readonly service: AnimauxService) { }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel animal' })
  @ApiResponse({ status: 201, description: 'Animal créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() dto: CreateAnimalDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les animaux' })
  @ApiResponse({ status: 200, description: 'Liste de tous les animaux' })
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un animal par son ID (utilisateur authentifié)' })
  @ApiParam({ name: 'id', description: 'ID de l\'animal', type: 'number' })
  @ApiResponse({ status: 200, description: 'Animal trouvé' })
  @ApiResponse({ status: 404, description: 'Animal non trouvé' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('search/name')
  @ApiOperation({ summary: 'Rechercher un animal par son nom' })
  @ApiQuery({ name: 'name', description: 'Nom de l\'animal à rechercher' })
  @ApiResponse({ status: 200, description: 'Animal trouvé' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  findByName(@Query('name') name: string) {
    return this.service.findByName(name);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un animal (gardien uniquement)' })
  @ApiParam({ name: 'id', description: 'ID de l\'animal à supprimer', type: 'number' })
  @ApiResponse({ status: 200, description: 'Animal supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Animal non trouvé' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - rôle gardien requis' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Get('soigner/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('veterinaire')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soigner un animal - remet la santé à 100 (vétérinaire uniquement)' })
  @ApiParam({ name: 'id', description: 'ID de l\'animal à soigner', type: 'number' })
  @ApiResponse({ status: 200, description: 'Animal soigné avec succès' })
  @ApiResponse({ status: 404, description: 'Animal non trouvé' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - rôle vétérinaire requis' })
  soignerAnimal(@Param('id', ParseIntPipe) id: number) {
    return this.service.soignerAnimal(id);
  }
}
