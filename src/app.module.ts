import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    database:"jwtAuth",
    username:"sc",
    password:"sc",
    synchronize:true,
    entities:[User]
  }),
  UserModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
