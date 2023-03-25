import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QueryModule } from "src/query/query.module";
import { RankController } from "./rank.controller";
import { Rank } from "./rank.entity";
import { RankService } from "./rank.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rank]),
        QueryModule
    ],
    controllers: [RankController],
    providers: [RankService],
    exports: [RankService]
})

export class RankModule { }
