import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getHello(): Promise<any>{
    return this.customersService.getHello();
  }
  
}
