import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { TownsModule } from './towns/towns.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [StatesModule, CitiesModule, TownsModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
