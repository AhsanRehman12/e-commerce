import { Module } from '@nestjs/common';
import { LoogerService } from './looger.service';

@Module({
  providers: [LoogerService],
  exports:[LoogerService]
})
export class LoogerModule {}
