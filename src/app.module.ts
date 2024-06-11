import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { TownsModule } from './towns/towns.module';

@Module({
  imports: [StatesModule, CitiesModule, TownsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
