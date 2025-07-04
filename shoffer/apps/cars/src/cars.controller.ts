import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getHello(): string {
    return this.carsService.getHello();
  }
}
