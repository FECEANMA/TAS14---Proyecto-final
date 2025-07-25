// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyModule } from './energy/energy.module';
import { ConfigModule } from '@nestjs/config';

@Module({
imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    EnergyModule,
  ],
})
export class AppModule {}
