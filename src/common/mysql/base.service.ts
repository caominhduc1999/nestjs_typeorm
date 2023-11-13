import { Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import {plainToInstance} from 'class-transformer';
import { UserDto } from "src/users/user.dto";

export class MysqlbaseService<Entity extends BaseEntity, Dto> {
    constructor(protected repo: Repository<Entity>) {

    }

    async save(userDto: Dto): Promise<any> {
        const savedUser = this.repo.save(userDto as any);

        return plainToInstance(UserDto, savedUser, {
            excludeExtraneousValues: true
        });
    }

    async update(id: string, userDto: any): Promise<{result: string}> {
        const updateResult = await this.repo.update(id, userDto as any);

        return {result: 'success'};
    }

    async findOne(id: string): Promise<any> {
        const foundUser = await this.repo.findOne({
            where: {
                id: id as any
            }
        });

        if (foundUser === null) {
            // return {};
        }

        return plainToInstance(UserDto, foundUser, {
            excludeExtraneousValues: true
        })
    }

    async deleteById(id: string): Promise<{result: string}> {
        const deleteResult = await this.repo.delete(id);
        
        return {result: 'success'};
    }
}