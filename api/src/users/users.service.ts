import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';



@Injectable()
export class UsersService {



    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    //create
            async create(user:User):Promise<User>{
                const newUser = this.userRepository.create(user);
                return await this.userRepository.save(newUser);

            }

    //login

            async login(email:string):Promise<User>{
                const user = await this.userRepository.findOne({
                    where:{email}
                })

               return user
            }
    
    
}

