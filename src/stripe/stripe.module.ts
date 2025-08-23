import { DynamicModule, Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot(), ProductModule,UsersModule],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_SECRET',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET'),
          inject: [ConfigService]
        }
      ]
    }
  }
}
