import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateRankDto } from "./dto/create.rank.dto";
import { Rank } from "./rank.entity";

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Rank) private readonly rankRepository: Repository<Rank>,
    ) { }

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

        await this.rankRepository.save(rank);
    }

    async update(rank: Rank, dto: CreateRankDto): Promise<void> {

        if (!!dto.name) {
            rank.name = dto.name;
        }

        if (!!dto.prefix) {
            rank.prefix = dto.prefix;
        }

        if (!!dto.suffix) {
            rank.suffix = dto.suffix;
        }

        if (!!dto.chatColor) {
            rank.chatColor = dto.chatColor;
        }

        await this.rankRepository.save(rank);
    }

    async delete(rank: Rank): Promise<void> {
        await this.rankRepository.remove(rank);
    }
}