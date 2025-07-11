import { Injectable, NotFoundException } from '@nestjs/common';
import { response } from 'express';
import { ReqRes } from 'scripts/ReqRes.script';

@Injectable()
export class CustomersService {
  async getHello(): Promise<any>{
    const response = await ReqRes(
  "GET",
  "http://localhost:3001/user"
  );
  console.log(response)
  if(!response){
    throw new NotFoundException('no response found')
  }
  return response
  }
  
}
