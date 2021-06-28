import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentModule } from './payment/payment.module';
import { ParticipantModule } from './participant/participant.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./src/environments/.env.development.local', './src/environments/.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ParticipantModule,
    PaymentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude:['/api*']
    })
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule { }
