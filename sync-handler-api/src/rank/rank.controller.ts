import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CreateRankDto } from "./dto/create.rank.dto";
import { UpdateRankDto } from "./dto/update.rank.dto";
import { Rank } from "./rank.entity";
import { RankService } from "./rank.service";

@UseGuards(JwtAuthGuard)
@Controller("rank")
export class RankController {
    constructor(
        private readonly rankService: RankService
    ) { }

    @Get()
    async findAll(): Promise<Rank[]> {
        return this.rankService.find();
    }

    @Get(":id")
    async findById(id: number): Promise<Rank | null> {
        const rank: Rank | null = await this.rankService.findOne({ where: [{ id }] });

        if (!rank) {
            throw new NotFoundException("Rank not found");
        }

        return rank;
    }

    @Post()
    async create(@Body() dto: CreateRankDto): Promise<void> {
        if (await this.rankService.findOne({ where: [{ name: dto.name }] })) {
            throw new BadRequestException("Rank name already exists");
        }

        await this.rankService.create(dto);
    }

    @Put(":id")
    async update(id: number, @Body() dto: UpdateRankDto): Promise<void> {
        const rank: Rank | null = await this.rankService.findOne({ where: [{ id }] });

        if (!rank) {
            throw new NotFoundException("Rank not found");
        }

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException("Empty request body");
        }

        if (await this.rankService.findOne({ where: [{ name: dto.name }] })) {
            throw new BadRequestException("Rank name already exists");
        }

        await this.rankService.update(rank, dto);
    }

    @Delete(":id")
    async delete(id: number): Promise<void> {
        const rank: Rank | null = await this.rankService.findOne({ where: [{ id }] });

        if (!rank) {
            throw new NotFoundException("Rank not found");
        }

        if ((await this.rankService.count()) === 1) {
            throw new BadRequestException("Cannot delete the last rank");
        }

        await this.rankService.delete(rank);
    }
}
