import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { TownsModule } from './towns/towns.module';
import { CustomerModule } from './customer/customer.module';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';

@Module({
  imports: [StatesModule, CitiesModule, TownsModule, CustomerModule, AddressModule],
  controllers: [AppController, AddressController],
  providers: [AppService, AddressService],
})
export class AppModule {}
