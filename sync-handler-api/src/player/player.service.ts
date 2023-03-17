import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rank } from "src/rank/rank.entity";
import { RankService } from "src/rank/rank.service";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreatePlayerDto } from "./dto/create.player.dto";
import { UpdatePlayerDto } from "./dto/update.player.dto";
import { Player } from "./player.entity";

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player) private readonly userRepository: Repository<Player>,
        private readonly rankService: RankService
    ) { }

    async find(options?: FindManyOptions<Player> | undefined): Promise<Player[]> {
        return this.userRepository.find(options);
    }

    async findOne(options: FindOneOptions<Player>): Promise<Player | null> {
        return this.userRepository.findOne(options);
    }

    async create(dto: CreatePlayerDto): Promise<void> {
        const player = new Player();

        player.uuid = dto.uuid;

        if (!!dto.rank) {
            player.rank = <Rank>dto.rank;
        }

        await this.userRepository.save(player);
    }

    async update(player: Player, dto: UpdatePlayerDto): Promise<void> {
        if (!!dto.rank) {
            player.rank = <Rank>dto.rank;
        }

        await this.userRepository.save(player);
    }

    async delete(player: Player): Promise<void> {
        await this.userRepository.remove(player);
    }
}