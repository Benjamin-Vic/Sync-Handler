import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ServerModule } from "src/server/server.module";
import { PlayerSubscriber } from "./player.subscriber";
import { RankSubscriber } from "./rank.subscriber";

@Module({
    imports: [
        ServerModule
    ],
    controllers: [],
    providers: [RankSubscriber, PlayerSubscriber],
    exports: []

})

export class SubscriberModule { }
