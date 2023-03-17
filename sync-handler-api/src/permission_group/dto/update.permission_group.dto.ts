import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Rank } from "src/rank/rank.entity";

export class UpdatePermissionGroupDto {
    @IsString({
        message: "Name must be a valid string"
    })
    @IsOptional()
    name: string;

    @IsString({
        message: "Description must be a valid string"
    })
    @IsOptional()
    description: string;

    @IsArray({
        message: "Ranks must be an array of ids (numbers)"
    })
    @Type(() => Number)
    @IsOptional()
    ranks: number[] | Rank[];
}
