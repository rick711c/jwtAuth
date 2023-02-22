import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { RegisterUser } from "./utls/registerUser.utls";
import { LoginUtls } from "./utls/login.utls";

@Injectable()
export class UserService{
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
    ){}

    //user registration functiuseron
    async registerUser(userdtls:RegisterUser){// i expect RigisterUser type variable in this function
        const newUser=await this.userRepository.create(userdtls);
        const user=await this.userRepository.save(newUser);
        return( user);
    }

    //authentication function for user login 
    async findUser (conditation:any):Promise<User>{
        console.log(conditation);
        const user=await this.userRepository.findOne({where:conditation});
        console.log(user);
        return user;
    }

    
    
}