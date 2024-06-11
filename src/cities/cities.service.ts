import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, City } from '@prisma/client';
import * as removeAccents from 'remove-accents';

@Injectable()
export class CitiesService {

  constructor(private readonly prisma: PrismaService){}

  async create(createCityDto: CreateCityDto) {
    const nameCity = removeAccents(createCityDto.name.toLowerCase());

    const existingCity = await this.prisma.city.findFirst({
      where: {
        name: {
          equals: nameCity,
          mode: 'insensitive'
        },
        stateId: createCityDto.stateId
      },
    });
    if(existingCity){
      throw new NotAcceptableException('El municipio ya existe en este estado');
    }

    return this.prisma.city.create({
      data: {
        name: createCityDto.name,
        stateId: createCityDto.stateId,
      },
    });
  }

  async findAll(): Promise<City[]> {
    return this.prisma.city.findMany();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: {
        id,
      },
    });
    
    if (!city) {
      throw new NotAcceptableException('Municipio no encontrado.');
    }

    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    await this.findOne(id);

    const nameCity = removeAccents(updateCityDto.name.toLocaleLowerCase());

    const existingCity = await this.prisma.city.findFirst({
      where: {
        name: {
          equals: nameCity,
          mode: 'insensitive',
        },
        id: {
          not: id,
        },
      },
    });

    if (existingCity){
      throw new NotAcceptableException('El municipio ya existe');
    }

    return this.prisma.city.update({
      data: { ...updateCityDto} as any,
      where: {
        id
      },
    });

  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.city.delete({
      where: {
        id
      }
    });
  }
}
