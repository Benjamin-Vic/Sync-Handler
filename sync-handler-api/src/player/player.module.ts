import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QueryModule } from "src/query/query.module";
import { RankModule } from "src/rank/rank.module";
import { PlayerController } from "./player.controller";
import { Player } from "./player.entity";
import { PlayerService } from "./player.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Player]),
        RankModule,
        QueryModule
    ],
    controllers: [PlayerController],
    providers: [PlayerService],
    exports: [PlayerService]
})

export class PlayerModule { }
