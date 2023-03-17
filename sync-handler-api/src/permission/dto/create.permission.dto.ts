import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PermissionGroup } from "src/permission_group/permission_group.entity";

export class CreatePermissionDto {
    @IsString({
        message: "Permission must be a valid string"
    })
    permission: string;

    @IsString({
        message: "Description must be a valid string"
    })
    @IsOptional()
    description: string;

    @IsArray({
        message: "Permission groups must be an array of ids (numbers)"
    })
    @Type(() => Number)
    @IsOptional()
    permissionGroups: number[] | PermissionGroup[];
}
