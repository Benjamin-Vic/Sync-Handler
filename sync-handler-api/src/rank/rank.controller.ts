import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { FindManyOptions } from "typeorm";
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

    @Get("columns")
    async getColumns(): Promise<string[]> {
        const removed = ["permissions", "permissionGroups", "players"];
        return (await this.rankService.getColumns()).filter((column: string) => !removed.includes(column));
    }

    @Get()
    async findAll(@Query() query: any): Promise<Rank[]> {
        const options: FindManyOptions<Rank> = {};

        if (query.sort && query.order) {
            if (!(await this.rankService.getColumns()).includes(query.sort)) {
                throw new BadRequestException("Invalid sort column");
            }

            if (!["ASC", "DESC"].includes(query.order)) {
                throw new BadRequestException("Invalid sort order");
            }

            options.order = {
                [query.sort]: query.order
            };
        }

        return this.rankService.find(options);
    }

    @Get(":id")
    async findById(@Param("id", ParseIntPipe) id: number): Promise<Rank | null> {
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
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRankDto): Promise<void> {
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
    async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
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
