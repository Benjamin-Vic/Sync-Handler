import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { Color } from "src/enum/color.enum";

export class CreateRankDto {
    @IsString({
        message: "Name must be a valid string"
    })
    name: string;

    @IsString({
        message: "Prefix must be a valid string"
    })
    @IsOptional()
    prefix: string;

    @IsString({
        message: "Suffix must be a valid string"
    })
    @IsOptional()
    suffix: string;

    @IsEnum(Color, {
        message: "Chat color must be a valid color"
    })
    chatColor: Color;

    @IsArray({
        message: "Permissions must be a valid array"
    })
    @IsOptional()
    permissions: string[];
}
