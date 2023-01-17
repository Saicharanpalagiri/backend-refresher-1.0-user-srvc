import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/submodules/backend-refresher-1.0-dtos/src/dtos/login.dto';
import { UserDto } from 'src/submodules/backend-refresher-1.0-dtos/src/dtos/user.dto';
import { User } from 'src/submodules/backend-refresher-entities-1.0/src/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,

    private jwt: JwtService,
  ){}
 
  async createUser(user: UserDto){
     
    try{
      let userEntity = this.userRepository.create(user)
      let createdUser = await this.userRepository.save(userEntity);
      return createdUser;
    } catch (err) {
      throw err
    }


  }

  //login-start

  //token
  async signToken(args: { email: string }) {
    const payload = {
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtConstants.secret
    });

    return token;
  }

  //login
  async loginUser(user: LoginDto) {
    try{
      let loginuser = await this.userRepository.find({
        where: {
          email: user.email,
        },
      });
      if (loginuser && loginuser[0].password === user.password) {
        const payload = { username: user.email, sub: user.password };
        const { email, password, ...rest } = loginuser[0];
        // return {
        //   // access_token: this.jwtService.sign(payload),
        //   rest,
        const token = await this.signToken({
          email: user.email,
        });
    
        if (!token) {
          throw new ForbiddenException('Could not signin');
        }
        return { token: token };
      }
      //console.log(loginuser)
      return null;
    } catch (err) {
      throw err
    }


  }


  //login-end

  async findAll(){
    try{
      let retrievedUsers = await this.userRepository.find();
      return retrievedUsers;
    } catch (err) {
      throw err
    }
  }

  async updateUser(user: UserDto){
    try{
      let updateResult = await this.userRepository.update(user.id,user);
      return updateResult;
    } catch (err) {
      throw err
    }
  }

  async deleteUser(userId: number){
    try{
      let deletedUser = await this.userRepository.delete(userId);
      return deletedUser;
    } catch (err) {
      throw err
    }
  }
}
