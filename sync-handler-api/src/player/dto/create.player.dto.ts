import { IsNumber, IsOptional, IsString } from "class-validator";
import { Rank } from "src/rank/rank.entity";

export class CreatePlayerDto {
    @IsString({
        message: "UUID must be a valid string"
    })
    uuid: string;

    @IsNumber({}, {
        message: "Rank ID must be a valid number"
    })
    @IsOptional()
    rank: number | Rank;
}
