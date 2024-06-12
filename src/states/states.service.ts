import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, State } from '@prisma/client';
import * as removeAccents from 'remove-accents';


@Injectable()
export class StatesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Método que registra un nuevo estado
   * @param data : datos del estado a registrar
   * @returns estado registrado
   */
  async create(data: Prisma.StateCreateInput): Promise<State> {
    const normalizedStateName = removeAccents(data.name.toLowerCase());

    const existingState = await this.prisma.state.findFirst({
      where: {
        name: {
          equals: normalizedStateName,
          mode: 'insensitive',
        },
      },
    });

    if (existingState) {
      throw new NotAcceptableException('El estado ya existe.');
    }

    return this.prisma.state.create({
      data,
    });
  }

  /**
   * Método para obtener todos los estados
   * @returns lista de estados
   */
  async findAll(): Promise<State[]> {
    return this.prisma.state.findMany();
  }

  /**
   * Método para obtener un estado por ID
   * @param id : ID del estado a buscar
   * @returns estado encontrado
   */
  async findOne(id: number): Promise<State> {
    const state = await this.prisma.state.findUnique({
      where: {
        id,
      },
    });

    if (!state) {
      throw new NotAcceptableException('Estado no encontrado.');
    }

    return state;
  }


  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    await this.findOne(id);

    const normalizedStateName = removeAccents(updateStateDto.name.toLowerCase());

    const existingState = await this.prisma.state.findFirst({
      where: {
        name: {
          equals: normalizedStateName,
          mode: 'insensitive',
        },
        id: {
          not: id,
        },
      },
    });

    if (existingState) {
      throw new NotAcceptableException('El estado ya existe.');
    }

    return this.prisma.state.update({
      data: { ...updateStateDto } as any,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.state.delete({
      where: {
        id
      }
    });
  }
}
