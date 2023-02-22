import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userInfo } from "os";
import { User } from "src/entity/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret:'secret',//process.env.SECRET,
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers:[UserService],
    controllers: [UserController]
})
export class UserModule {}