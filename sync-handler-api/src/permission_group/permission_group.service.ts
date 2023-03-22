import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rank } from "src/rank/rank.entity";
import { RankService } from "src/rank/rank.service";
import { FindManyOptions, FindOneOptions, In, Repository } from "typeorm";
import { CreatePermissionGroupDto } from "./dto/create.permission_group.dto";
import { UpdatePermissionGroupDto } from "./dto/update.permission_group.dto";
import { PermissionGroup } from "./permission_group.entity";

@Injectable()
export class PermissionGroupService {
    constructor(
        @InjectRepository(PermissionGroup) private readonly permissionGroupRepository: Repository<PermissionGroup>,
    ) { }

    async getColumns(): Promise<string[]> {
        return Object.keys(this.permissionGroupRepository.metadata.propertiesMap);
    }

    async find(options?: FindManyOptions<PermissionGroup> | undefined): Promise<PermissionGroup[]> {
        return this.permissionGroupRepository.find(options);
    }

    async findOne(options: FindOneOptions<PermissionGroup>): Promise<PermissionGroup | null> {
        return this.permissionGroupRepository.findOne(options);
    }

    async create(dto: CreatePermissionGroupDto): Promise<void> {
        const permissionGroup: PermissionGroup = new PermissionGroup();

        permissionGroup.name = dto.name;

        if (!!dto.description) {
            permissionGroup.description = dto.description;
        }

        if (!!dto.ranks) {
            permissionGroup.ranks = <Rank[]>dto.ranks;
        }

        this.permissionGroupRepository.create(permissionGroup);
    }

    async update(permissionGroup: PermissionGroup, dto: UpdatePermissionGroupDto): Promise<void> {

        if (!!dto.name) {
            permissionGroup.name = dto.name;
        }

        if (!!dto.description) {
            permissionGroup.description = dto.description;
        }

        if (!!dto.ranks) {
            permissionGroup.ranks = <Rank[]>dto.ranks;
        }

        await this.permissionGroupRepository.save(permissionGroup);
    }

    async delete(permissionGroup: PermissionGroup): Promise<void> {
        await this.permissionGroupRepository.remove(permissionGroup);
    }
}
