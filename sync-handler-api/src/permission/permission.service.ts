import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionGroup } from "src/permission_group/permission_group.entity";
import { PermissionGroupService } from "src/permission_group/permission_group.service";
import { FindManyOptions, FindOneOptions, In, Repository } from "typeorm";
import { CreatePermissionDto } from "./dto/create.permission.dto";
import { Permission } from "./permission.entity";

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async getColumns(): Promise<string[]> {
        return Object.keys(this.permissionRepository.metadata.propertiesMap);
    }

    async find(options?: FindManyOptions<Permission> | undefined): Promise<Permission[]> {
        return this.permissionRepository.find(options);
    }

    async findOne(options: FindOneOptions<Permission>): Promise<Permission | null> {
        return this.permissionRepository.findOne(options);
    }

    async create(dto: CreatePermissionDto): Promise<void> {
        const permission: Permission = new Permission();

        permission.permission = dto.permission;

        if (!!dto.description) {
            permission.description = dto.description;
        }

        if (!!dto.permissionGroups) {
            permission.permissionGroups = <PermissionGroup[]>dto.permissionGroups;
        }

        await this.permissionRepository.save(permission);
    }

    async update(permission: Permission, dto: CreatePermissionDto): Promise<void> {

        if (Object.keys(dto).length === 0) {
            return;
        }

        if (!!dto.permission) {
            permission.permission = dto.permission;
        }

        if (!!dto.description) {
            permission.description = dto.description;
        }

        if (!!dto.permissionGroups) {
            permission.permissionGroups = <PermissionGroup[]>dto.permissionGroups;
        }

        await this.permissionRepository.save(permission);
    }

    async delete(permission: Permission): Promise<void> {
        await this.permissionRepository.remove(permission);
    }
}
