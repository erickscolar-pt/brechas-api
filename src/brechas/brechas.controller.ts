import { Controller, Get, Post, Body } from '@nestjs/common';
import { BrechasService } from './brechas.service';
import { CreateBrechaDto, CreateMarinerDto } from './dto/create-brecha.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('brechas') // Define a tag para o Swagger
@Controller('brechas')
export class BrechasController {
  constructor(private readonly brechasService: BrechasService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova brecha' })
  @ApiBody({ type: CreateBrechaDto }) // Define o tipo de corpo da requisição
  @ApiResponse({ status: 201, description: 'Brecha criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createBrechaDto: CreateBrechaDto) {
    return this.brechasService.create(createBrechaDto);
  }

  @Post('mariner')
  @ApiOperation({ summary: 'Criar um novo mariner' })
  @ApiBody({ type: CreateMarinerDto }) // Define o tipo de corpo da requisição
  @ApiResponse({ status: 201, description: 'Mariner criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createMariner(@Body() createMarinerDto: CreateMarinerDto) {
    const { nome, sobrenome } = createMarinerDto;
    return await this.brechasService.createMariner(nome, sobrenome);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os mariners com seus pontos' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de mariners com pontos' })
  findAll() {
    return this.brechasService.getMarinersWithPoints();
  }

  @Get("mariners")
  @ApiOperation({ summary: 'Lista todos os mariners' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de mariners' })
  listaMariner() {
    return this.brechasService.listaMariner();
  }
}
