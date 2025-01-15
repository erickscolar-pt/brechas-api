import { Injectable } from '@nestjs/common';
import { CreateBrechaDto } from './dto/create-brecha.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BrechasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBrechaDto: CreateBrechaDto) {
    const { vitoria, empate, id_mariners, frase, data } = createBrechaDto;

    return await this.prisma.brasileirao.create({
      data: {
        vitoria,
        empate,
        frase,
        id_mariners,
        data,
      },
    });
  }

  async createMariner(nome: string, sobrenome: string) {
    return await this.prisma.mariners.create({
      data: {
        nome,
        sobrenome,
      },
    });
  }

  async getMarinersWithPoints() {
    const brechas = await this.prisma.brasileirao.findMany({
      select: {
        id_mariners: true,
        vitoria: true,
        empate: true,
        frase: true,
        Mariners: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    // Agrupar os dados por mariner
    const marinersMap = new Map<number, any>();

    brechas.forEach(brecha => {
      const marinerId = brecha.id_mariners;
      const pontos = brecha.vitoria * 3 + brecha.empate; // Somar pontos: vitória (3 pontos) + empate (1 ponto)

      if (!marinersMap.has(marinerId)) {
        marinersMap.set(marinerId, {
          id_mariners: marinerId,
          nome: brecha.Mariners.nome,
          total_vitoria: 0,
          total_empate: 0,
          total_pontos: 0,
          frases: [],
        });
      }

      const marinerData = marinersMap.get(marinerId);
      marinerData.total_vitoria += brecha.vitoria;
      marinerData.total_empate += brecha.empate;
      marinerData.total_pontos += pontos;
      // Adicionar a frase sem duplicar
      if (!marinerData.frases.includes(brecha.frase)) {
        marinerData.frases.push(brecha.frase);
      }
    });

    // Converter o mapa para um array
    return Array.from(marinersMap.values()).sort((a, b) => b.total_pontos - a.total_pontos); // Ordenar por total de pontos
  }

  async listaMariner(){
    return await this.prisma.mariners.findMany();
  }

}
