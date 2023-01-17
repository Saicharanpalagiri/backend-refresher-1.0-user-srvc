import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { Content } from './submodules/backend-refresher-entities-1.0/src/entities/content-entity';
import { User } from './submodules/backend-refresher-entities-1.0/src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'mydatabase-instance.cc1kuvxcs7tm.ap-northeast-1.rds.amazonaws.com',
      port: 5432,
      username: 'charan',
      password: 'charan123',
      database: 'backend-socialmedia',
      entities: [User, Content],
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
