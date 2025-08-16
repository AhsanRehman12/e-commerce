import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { StripeModule } from './stripe/stripe.module';
import { WebhookController } from './webhook/webhook.controller';
import { json } from 'express';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), MongooseModule.forRoot(process.env.DB_URL!), UsersModule, ProductModule, StripeModule.forRootAsync(), OrderModule],
  controllers: [AppController, WebhookController],
  providers: [AppService],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(json({verify:(req:any,res,buf)=> {req.rawBody = buf}}))
      .exclude({path:'webhook', method:RequestMethod.POST})
      .forRoutes('*')

      consumer
      .apply(json({verify:(req:any,res,buf)=> {req.rawBody = buf}}))
      .forRoutes(WebhookController)
  }
}
  