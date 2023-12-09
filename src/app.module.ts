import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './environment/env.validation';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ResourcesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env.development', '.env.production']
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
