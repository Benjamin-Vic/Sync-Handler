import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionModule } from "src/permission/permission.module";
import { RankModule } from "src/rank/rank.module";
import { PermissionGroupController } from "./permission_group.controller";
import { PermissionGroup } from "./permission_group.entity";
import { PermissionGroupService } from "./permission_group.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PermissionGroup]),
        RankModule
    ],
    controllers: [PermissionGroupController],
    providers: [PermissionGroupService],
    exports: [PermissionGroupService]
})

export class PermissionGroupModule { }
