import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }
    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto, @Body('address') createAddressDto: CreateAddressDto) {
        return this.customerService.create(createCustomerDto, createAddressDto);
    }
    @Get()
    findAll() {
        return this.customerService.findAll();
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.findOne(id);
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: CreateCustomerDto) {
        return this.customerService.update(id, updateCustomerDto);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.remove(id);
    }
}
