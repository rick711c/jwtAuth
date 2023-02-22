import { Body, Controller, Get, Inject, Post, Res ,Req} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express';
import { PassThrough } from 'stream';
//import cookieParser from 'cookie-parser';


const saltOrRounds = 10;
@Controller('/user')
export class UserController {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
    ) {}

  //post request to register new user
  @Post('/register')
  async registerUser(@Body() userdtls: UserDto) {
    //bcrypt.hash(userdtls.password, saltOrRounds:12);
    const hash = await bcrypt.hash(userdtls.password, saltOrRounds);
    userdtls.password = hash;
    return await this.userService.registerUser(userdtls);
    
  }

  //post request for login user
  @Post('/login')
  async loginUser(@Body() loginDtls:LoginDto,
  @Res({passthrough:true})response: Response
  )
  {
    const user=await this.userService.findUser(loginDtls.id);
    if(!user){
      return "Invalid credentials"
    }
    else if(!await bcrypt.compare(loginDtls.password,user.password)){
      return "Invalid credentials password" 
    }
    else {
      const payload={username:user.name,suuserb:user.id}
      const jwt = await this.jwtService.sign(payload);
      response.cookie('jwt',jwt,{httpOnly:true});//this will save the cookie in the browser
      return user;
    }
  }
  //validating the user with the cookie and getting user details from the server using the cookie
  @Get('validate')
  async validateUser(@Req() request:Request){ 
    const cookie=request.cookies['jwt'];
    return cookie;
  }

  //logout funtion
  @Post('logout')
  async logout(@Req()request:Request,
        @Res({passthrough:true}) response:Response){
    //response.clearCookie('jwt');
    const cookie=await request.cookies['jwt'];
    console.log(cookie);
    response.clearCookie['jwt'];
    return{
      message:'logged out',
    }
  }
}