import { ApiProperty } from '@nestjs/swagger';

export class CreateBrechaDto {

  @ApiProperty({ description: 'A quantidade de vitórias', example: 3 })
  vitoria: number;

  @ApiProperty({ description: 'A quantidade de empates', example: 0 })
  empate: number;

  @ApiProperty({ description: 'A data em que a brecha foi criada', example: '2025-01-15T10:30:00.000Z' })
  data: Date;

  @ApiProperty({ description: 'A frase de duplo sentido da brecha' })
  frase: string;

  @ApiProperty({ description: 'O ID do mariner associado à brecha' })
  id_mariners: number;
}

export class CreateMarinerDto {
  @ApiProperty({ description: 'Nome do mariner' })
  nome: string;

  @ApiProperty({ description: 'Sobrenome do mariner' })
  sobrenome: string;
}