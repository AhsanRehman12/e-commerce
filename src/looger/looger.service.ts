import { Injectable } from '@nestjs/common';
import { winstonConfig } from 'src/winston.config';
import {Logger} from 'winston'
import * as winston from 'winston'

@Injectable()
export class LoogerService {
  private readonly looger:Logger
  constructor(){
    this.looger = winston.createLogger(winstonConfig)
  }

  log(message:string){
    this.looger.log({level:'info',message});
  }
  error(message:string){
    this.looger.log({level:'error',message})
  }
}
