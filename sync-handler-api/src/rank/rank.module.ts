import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankController } from "./rank.controller";
import { Rank } from "./rank.entity";
import { RankService } from "./rank.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rank])
    ],
    controllers: [RankController],
    providers: [RankService],
    exports: [RankService]
})

export class RankModule { }
