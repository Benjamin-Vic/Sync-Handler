import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { PermissionGroup } from "src/permission_group/permission_group.entity";
import { PermissionGroupService } from "src/permission_group/permission_group.service";
import { In } from "typeorm";
import { CreatePermissionDto } from "./dto/create.permission.dto";
import { UpdatePermissionDto } from "./dto/update.permission.dto";
import { Permission } from "./permission.entity";
import { PermissionService } from "./permission.service";

@UseGuards(JwtAuthGuard)
@Controller("permission")
export class PermissionController {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly permissionGroupService: PermissionGroupService,
    ) { }

    @Get()
    async findAll(): Promise<Permission[]> {
        return this.permissionService.find();
    }

    @Get(":id")
    async findById(@Param("id", ParseIntPipe) id: number): Promise<Permission | null> {
        const permission: Permission | null = await this.permissionService.findOne({ where: [{ id }] });

        if (!permission) {
            throw new NotFoundException("Permission not found");
        }

        return permission;
    }

    @Post()
    async create(@Body() dto: CreatePermissionDto): Promise<void> {
        if (await this.permissionService.findOne({ where: [{ permission: dto.permission }] })) {
            throw new BadRequestException("Permission already exists");
        }

        if (!!dto.permissionGroups && dto.permissionGroups.length !== 0) {
            const permissionGroups: PermissionGroup[] = await this.permissionGroupService.find({ where: { id: In(<number[]>dto.permissionGroups) } });

            if (permissionGroups.length !== dto.permissionGroups.length) {
                throw new BadRequestException("One or more Permission Groups do not exist");
            }

            dto.permissionGroups = permissionGroups;
        }

        await this.permissionService.create(dto);
    }

    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePermissionDto): Promise<void> {
        const permission: Permission | null = await this.permissionService.findOne({ where: [{ id }] });

        if (!permission) {
            throw new NotFoundException("Permission not found");
        }

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException("Empty request body");
        }

        if (await this.permissionService.findOne({ where: [{ permission: dto.permission }] })) {
            throw new BadRequestException("Permission already exists");
        }

        if (!!dto.permissionGroups && dto.permissionGroups.length !== 0) {
            const permissionGroups: PermissionGroup[] = await this.permissionGroupService.find({ where: { id: In(<number[]>dto.permissionGroups) } });

            if (permissionGroups.length !== dto.permissionGroups.length) {
                throw new BadRequestException("One or more Permission Groups do not exist");
            }

            dto.permissionGroups = permissionGroups;
        }

        await this.permissionService.update(permission, dto);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        const permission: Permission | null = await this.permissionService.findOne({ where: [{ id }] });

        if (!permission) {
            throw new NotFoundException("Permission not found");
        }

        await this.permissionService.delete(permission);
    }
}
