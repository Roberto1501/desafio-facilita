import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './tasks.entity';


@Injectable()
export class TasksService {


    
    constructor(
        @InjectRepository(Tasks)
        private userRepository:Repository<Tasks>
    ){}
    //getAll
             async findAll():Promise<Tasks[]>{
                return await this.userRepository.find();
               }
    //getOne
            async findOne(id:number):Promise<Tasks>{
                return await this.userRepository.findOne({
                    where:{id}
                });
               }
    //create
            async create(task:Tasks):Promise<Tasks>{
                const newUser = this.userRepository.create(task);
                return await this.userRepository.save(newUser);

            }
    
    //update
            async update(id:number,task:Tasks):Promise<Tasks>{
                await this.userRepository.update(id,task);
                return await this.userRepository.findOne({
                    where:{id}
                });
            }

    //delete
            
            async delete(id:number):Promise<void>{
                 await this.userRepository.delete(id)
            }
}


