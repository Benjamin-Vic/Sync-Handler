import { Module } from "@nestjs/common";
import { PlayerModule } from "src/player/player.module";
import { RankModule } from "src/rank/rank.module";
import { ServerGateway } from "./server.gateway";

@Module({
    imports: [
        RankModule,
        PlayerModule
    ],
    controllers: [],
    providers: [ServerGateway],
    exports: [ServerGateway]
})

export class ServerModule { }
