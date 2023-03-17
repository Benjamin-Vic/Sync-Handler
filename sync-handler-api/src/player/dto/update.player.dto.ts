import { IsNumber, IsOptional, IsString } from "class-validator";
import { Rank } from "src/rank/rank.entity";

export class UpdatePlayerDto {
    @IsNumber({}, {
        message: "Rank ID must be a valid number"
    })
    @IsOptional()
    rank: number | Rank;
}
