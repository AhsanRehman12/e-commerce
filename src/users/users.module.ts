import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { ProductModule } from 'src/product/product.module';
import { LoogerModule } from 'src/looger/looger.module';
import { LoogerService } from 'src/looger/looger.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ProductModule,LoogerModule],
  controllers: [UsersController],
  providers: [UsersService,LoogerService],
  exports: [UsersService]
})
export class UsersModule { }
