import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities';
import { CreateFoodDto } from './dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRespository: Repository<Food>,
  ) {}

  createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const food = new Food();
    if (createFoodDto.id) {
      food.id = createFoodDto.id;
    }
    food.name = createFoodDto.name;
    food.description = createFoodDto.description;
    food.category = createFoodDto.category;
    food.image = createFoodDto.image;
    food.price = createFoodDto.price;
    return this.foodRespository.save(food);
  }

  async findFoods(): Promise<Food[]> {
    return await this.foodRespository.find();
  }

  async findOneFood(id: number): Promise<Food> {
    return await this.foodRespository.findOneBy({ id: id });
  }

  async removeFood(id: number): Promise<void> {
    await await this.foodRespository.delete(id);
  }
}
