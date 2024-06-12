import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTownDto } from './dto/create-town.dto';
import { UpdateTownDto } from './dto/update-town.dto';
import { PrismaService } from 'src/prisma.service';
import { Town } from '@prisma/client';
import { remove } from 'remove-accents';


@Injectable()
export class TownsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTownDto: CreateTownDto) {
    const nameTown = remove(createTownDto.name.toLocaleLowerCase());

    const existingTown = await this.prisma.town.findFirst({
      where: {
        name: {
          equals: nameTown,
          mode: 'insensitive'
        },
        cityId: createTownDto.cityId
      },
    });
    if (existingTown) {
      throw new NotAcceptableException('La localidad ya existe en este municipio');
    }

    return this.prisma.town.create({
      data: {
        name: createTownDto.name,
        cityId: createTownDto.cityId,
      },
    });
  };


  async findAll(): Promise<Town[]> {
    return this.prisma.town.findMany();
  }

  async findOne(id: number): Promise<Town> {
    const town = await this.prisma.town.findUnique({
      where: {
        id,
      },
    });

    if (!town) {
      throw new NotAcceptableException('Localidad no encontrada');
    }

    return town;
  }

  async update(id: number, updateTownDto: UpdateTownDto): Promise<Town> {
    await this.findOne(id);

    const nameTown = remove(updateTownDto.name.toLocaleLowerCase());

    const existingTown = await this.prisma.town.findFirst({
      where: {
        name: {
          equals: nameTown,
          mode: 'insensitive',
        },
        id: {
          not: id,
        },
      },
    });
    if (existingTown) {
      throw new NotAcceptableException('La localidad ya existe');
    }

    return this.prisma.town.update({
      data: { ...updateTownDto } as any,
      where: {
        id
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.town.delete({
      where: {
        id
      }
    });
  }
}
