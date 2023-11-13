import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import {plainToInstance} from 'class-transformer';
import { MysqlbaseService } from 'src/common/mysql/base.service';

@Injectable()
export class UserService extends MysqlbaseService<UserEntity, UserDto> {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
        super(userRepository);
    }
}