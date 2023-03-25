import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { QueryService } from "src/query/query.service";
import { Rank } from "src/rank/rank.entity";
import { RankService } from "src/rank/rank.service";
import { FindManyOptions } from "typeorm";
import { CreatePlayerDto } from "./dto/create.player.dto";
import { UpdatePlayerDto } from "./dto/update.player.dto";
import { Player } from "./player.entity";
import { PlayerService } from "./player.service";

@UseGuards(JwtAuthGuard)
@Controller("player")
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService,
        private readonly rankService: RankService,
        private readonly queryService: QueryService
    ) { }

    @Get("columns")
    async getColumns(): Promise<string[]> {
        
        return this.playerService.getColumns();
    }

    @Get()
    async findAll(@Query() query: any): Promise<[Player[], number]> {
        const options: FindManyOptions<any> = this.queryService.parseFindAll(query, await this.getColumns());
        options.relations = ["rank"];
        return [await this.playerService.find(options), await this.playerService.count(options.where ? { where: options.where } : {})];
    }

    @Get(":id")
    async findById(@Param("id") id: number): Promise<Player | null> {
        const player: Player | null = await this.playerService.findOne({ where: { id } });

        if (!player) {
            throw new NotFoundException("Player not found");
        }

        return player;
    }

    @Post()
    async create(@Body() dto: CreatePlayerDto): Promise<void> {
        if (await this.playerService.findOne({ where: { uuid: dto.uuid } })) {
            throw new NotFoundException("Player uuid already exists");
        }

        if (!!dto.rank) {
            const rank: Rank | null = await this.rankService.findOne({ where: { id: <number>dto.rank } });

            if (!rank) {
                throw new NotFoundException("Rank does not exist");
            }

            dto.rank = rank;
        }

        await this.playerService.create(dto);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: UpdatePlayerDto): Promise<void> {
        const player: Player | null = await this.playerService.findOne({ where: { id } });

        if (!player) {
            throw new NotFoundException("Player not found");
        }

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException("Empty request body");
        }

        if (!!dto.rank) {
            const rank: Rank | null = await this.rankService.findOne({ where: { id: <number>dto.rank } });

            if (!rank) {
                throw new NotFoundException("Rank does not exist");
            }

            dto.rank = rank;
        }

        await this.playerService.update(player, dto);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const player: Player | null = await this.playerService.findOne({ where: { id } });

        if (!player) {
            throw new NotFoundException("Player not found");
        }

        await this.playerService.delete(player);
    }
}
