import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionGroupModule } from "src/permission_group/permission_group.module";
import { RankModule } from "src/rank/rank.module";
import { PermissionController } from "./permission.controller";
import { Permission } from "./permission.entity";
import { PermissionService } from "./permission.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Permission]),
        PermissionGroupModule
    ],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService]
})

export class PermissionModule { }
