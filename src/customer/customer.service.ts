import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { Client } from '@prisma/client';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCustomerDto: CreateCustomerDto, createAddressDto: CreateAddressDto) {
        return this.prisma.client.create({
            data: {
                name: createCustomerDto.name,
                lastName: createCustomerDto.lastName,
                rfc: createCustomerDto.rfc,
                address: {
                    create: {
                        townId: createAddressDto.townId,
                        street: createAddressDto.street,
                        exteriorNum: createAddressDto.exteriorNum,
                        interiorNum: createAddressDto.interiorNum,
                        postalCode: createAddressDto.postalCode
                    }
                },
                email: createCustomerDto.email,
                phone: createCustomerDto.phone,
                status: createCustomerDto.status
            }
        });
    }
    async findAll(): Promise<Client[]> {
        return this.prisma.client.findMany();
    }
    async findOne(id: number): Promise<Client> {
        const customer = await this.prisma.client.findUnique({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new NotAcceptableException('Cliente no encontrado');
        }
        return customer;
    }
    async update(id: number, updateCustomerDto: CreateCustomerDto): Promise<Client> {
        await this.findOne(id);
        return this.prisma.client.update({
            data: {
                ...updateCustomerDto
            } as any,
            where: {
                id,
            },
        });
    }
    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.client.delete({
            where: {
                id,
            },
        });
    }

}
