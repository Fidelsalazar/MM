import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailCollectorController } from './controllers/email-colector/email-collector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, EmailSchema } from './schemas/email.schema';
import { EmailCollectorService } from './services/email-collector.service';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DATABASE_URL,
        connectionOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
  ],
  controllers: [AppController, EmailCollectorController],
  providers: [AppService, EmailCollectorService],
})
export class AppModule {}
