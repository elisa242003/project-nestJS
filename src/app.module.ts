import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [StatesModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
