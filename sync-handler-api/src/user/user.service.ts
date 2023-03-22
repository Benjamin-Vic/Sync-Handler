import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create.user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto/update.user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async getColumns(): Promise<string[]> {
        return Object.keys(this.userRepository.metadata.propertiesMap);
    }

    async find(): Promise<[User[], number]> {
        return this.userRepository.findAndCount();
    }

    async findOne(options: FindOneOptions<User>): Promise<User | null> {
        return this.userRepository.findOne(options);
    }

    async create(dto: CreateUserDto): Promise<void> {
        const user: User = new User();

        user.name = dto.name;
        user.email = dto.email;
        user.password = await bcrypt.hash(dto.password, 10);;

        this.userRepository.create(user);
    }

    async update(user: User, dto: UpdateUserDto): Promise<void> {

        if (!!dto.name) {
            user.name = dto.name;
        }

        if (!!dto.email) {
            user.email = dto.email;
        }

        if (!!dto.password) {
            user.password = await bcrypt.hash(dto.password, 10);
        }

        await this.userRepository.save(user);
    }

    async delete(user: User): Promise<void> {
        await this.userRepository.remove(user);
    }
}
