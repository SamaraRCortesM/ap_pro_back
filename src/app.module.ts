import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl: 
          process.env.POSTGRES_SSL === 'true' ? {
            rejectUnauthorized: false
          } : null,
      }
    }),
    FoodsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
