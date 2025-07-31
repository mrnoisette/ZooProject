import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EnclosService } from './enclos.service';
import { CreateEnclosDto } from './dto/create-enclos.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('enclos')
@Controller('enclos')
export class EnclosController {
  constructor(private readonly service: EnclosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouvel enclos (gardien uniquement)' })
  @ApiResponse({ status: 201, description: 'Enclos créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - rôle gardien requis' })
  create(@Body() dto: CreateEnclosDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les enclos' })
  @ApiResponse({ status: 200, description: 'Liste de tous les enclos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un enclos par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'enclos', type: 'number' })
  @ApiResponse({ status: 200, description: 'Enclos trouvé' })
  @ApiResponse({ status: 404, description: 'Enclos non trouvé' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un enclos (gardien uniquement)' })
  @ApiParam({ name: 'id', description: 'ID de l\'enclos à modifier', type: 'number' })
  @ApiResponse({ status: 200, description: 'Enclos modifié avec succès' })
  @ApiResponse({ status: 404, description: 'Enclos non trouvé' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - rôle gardien requis' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateEnclosDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un enclos (gardien uniquement)' })
  @ApiParam({ name: 'id', description: 'ID de l\'enclos à supprimer', type: 'number' })
  @ApiResponse({ status: 200, description: 'Enclos supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Enclos non trouvé' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - rôle gardien requis' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
} 