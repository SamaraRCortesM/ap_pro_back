import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { FoodsService } from './foods.service';
import { Food } from './entities';
import { CreateFoodDto } from './dto';

@ApiTags('Foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @ApiCreatedResponse({ description: 'La comida ha sido creada', type: Food })
  @ApiBadRequestResponse({ description: 'Mala petición' })
  @ApiForbiddenResponse({ description: 'La comida ya existe.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Post('/save')
  create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodsService.createFood(createFoodDto);
  }

  @ApiBadRequestResponse({ description: 'Mala petición' })
  @ApiNotFoundResponse({ description: 'Comidas no encontradas' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Get('/all')
  findAll(): Promise<Food[]> {
    return this.foodsService.findFoods();
  }

  @ApiBadRequestResponse({ description: 'Mala petición' })
  @ApiNotFoundResponse({ description: 'Comida no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Food> {
    return this.foodsService.findOneFood(id);
  }

  @ApiCreatedResponse({ description: 'La comida ha sido eliminada' })
  @ApiBadRequestResponse({ description: 'Mala petición' })
  @ApiNotFoundResponse({ description: 'Comida no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Delete('/delete/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.foodsService.removeFood(id);
  }
}
