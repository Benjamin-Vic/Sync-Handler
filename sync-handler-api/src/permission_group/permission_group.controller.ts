import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { Rank } from "src/rank/rank.entity";
import { RankService } from "src/rank/rank.service";
import { In } from "typeorm";
import { CreatePermissionGroupDto } from "./dto/create.permission_group.dto";
import { UpdatePermissionGroupDto } from "./dto/update.permission_group.dto";
import { PermissionGroup } from "./permission_group.entity";
import { PermissionGroupService } from "./permission_group.service";

@UseGuards(JwtAuthGuard)
@Controller("permissiongroup")
export class PermissionGroupController {
    constructor(
        private readonly permissionGroupService: PermissionGroupService,
        private readonly rankService: RankService,
    ) { }

    @Get("columns")
    async getColumns(): Promise<string[]> {
        return this.permissionGroupService.getColumns();
    }

    @Get()
    async findAll(): Promise<PermissionGroup[]> {
        return this.permissionGroupService.find();
    }

    @Get(":id")
    async findById(id: number): Promise<PermissionGroup | null> {
        const permissionGroup: PermissionGroup | null = await this.permissionGroupService.findOne({ where: [{ id }] });

        if (!permissionGroup) {
            throw new NotFoundException("Permission Group not found");
        }

        return permissionGroup;
    }

    @Post()
    async create(@Body() dto: CreatePermissionGroupDto): Promise<void> {
        if (await this.permissionGroupService.findOne({ where: [{ name: dto.name }] })) {
            throw new BadRequestException("Permission Group name already exists");
        }

        if (!!dto.ranks && dto.ranks.length !== 0) {
            const ranks: Rank[] = await this.rankService.find({ where: { id: In(<number[]>dto.ranks) } });

            if (ranks.length !== dto.ranks.length) {
                throw new BadRequestException("One or more ranks do not exist");
            }

            dto.ranks = ranks;
        }

        await this.permissionGroupService.create(dto);
    }

    @Put(":id")
    async update(id: number, @Body() dto: UpdatePermissionGroupDto): Promise<void> {
        const permissionGroup: PermissionGroup | null = await this.permissionGroupService.findOne({ where: [{ id }] });

        if (!permissionGroup) {
            throw new NotFoundException("Permission Group not found");
        }

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException("Empty request body");
        }

        if (await this.permissionGroupService.findOne({ where: [{ name: dto.name }] })) {
            throw new NotFoundException("Permission Group name already exists");
        }

        if (!!dto.ranks && dto.ranks.length !== 0) {
            const ranks: Rank[] = await this.rankService.find({ where: { id: In(<number[]>dto.ranks) } });

            if (ranks.length !== dto.ranks.length) {
                throw new BadRequestException("One or more ranks do not exist");
            }

            dto.ranks = ranks;
        }

        await this.permissionGroupService.update(permissionGroup, dto);
    }

    @Delete(":id")
    async delete(id: number): Promise<void> {
        const permissionGroup: PermissionGroup | null = await this.permissionGroupService.findOne({ where: [{ id }] });

        if (!permissionGroup) {
            throw new NotFoundException("Permission Group not found");
        }

        await this.permissionGroupService.delete(permissionGroup);
    }
}