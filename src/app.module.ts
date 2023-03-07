import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { config } from './config/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    CatsModule,
    UsersModule, 
    MongooseModule.forRoot(process.env.DATABASE), 
    CategoriesModule, 
    AuthModule, PostsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: []
})
export class AppModule {}
