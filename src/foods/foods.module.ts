import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { Food } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
