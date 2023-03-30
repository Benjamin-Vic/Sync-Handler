import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateRankDto } from "./dto/create.rank.dto";
import { UpdateRankDto } from "./dto/update.rank.dto";
import { Rank } from "./rank.entity";

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Rank) private readonly rankRepository: Repository<Rank>,
    ) { }

    async getColumns(): Promise<string[]> {
        return Object.keys(this.rankRepository.metadata.propertiesMap);
    }

    async find(options?: FindManyOptions<Rank> | undefined): Promise<Rank[]> {
        return this.rankRepository.find(options);
    }

    async findOne(options: FindOneOptions<Rank>): Promise<Rank | null> {
        return this.rankRepository.findOne(options);
    }

    async count(options?: FindManyOptions<Rank> | undefined): Promise<number> {
        return this.rankRepository.count(options);
    }

    async create(dto: CreateRankDto): Promise<void> {
        const rank = new Rank();

        rank.name = dto.name;

        if (!!dto.prefix) {
            rank.prefix = dto.prefix;
        }

        if (!!dto.suffix) {
            rank.suffix = dto.suffix;
        }

        if (!!dto.chatColor) {
            rank.chatColor = dto.chatColor;
        }

        if (!!dto.permissions) {
            rank.permissions = dto.permissions;
        }

        await this.rankRepository.save(rank);
    }

    async update(rank: Rank, dto: UpdateRankDto): Promise<void> {
        if (!!dto.name && rank.name !== 'default') {
            rank.name = dto.name;
        }

        if (dto.prefix !== undefined) {
            rank.prefix = !!dto.prefix ? dto.prefix : null;
        }

        if (dto.suffix !== undefined) {
            rank.suffix = !!dto.suffix ? dto.suffix : null;
        }

        if (dto.chatColor !== undefined) {
            rank.chatColor = !!dto.chatColor ? dto.chatColor : null;
        }

        if (dto.permissions !== undefined) {
            rank.permissions = !!dto.permissions ? dto.permissions : null;
        }

        await this.rankRepository.save(rank);
    }

    async delete(rank: Rank): Promise<void> {
        await this.rankRepository.delete({id: rank.id});
    }
}
