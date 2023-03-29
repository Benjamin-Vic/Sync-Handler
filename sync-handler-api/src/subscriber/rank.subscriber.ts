import { PlayerService } from "src/player/player.service";
import { RankService } from "src/rank/rank.service";
import { ServerGateway } from "src/server/server.gateway";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Rank } from "../rank/rank.entity";

@EventSubscriber()
export class RankSubscriber implements EntitySubscriberInterface<Rank> {
    constructor(
        dataSource: DataSource,
        private readonly serverGateway: ServerGateway
    ) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Rank;
    }

    afterInsert(event: InsertEvent<any>) {
        this.serverGateway.onRank();
    }

    afterUpdate(event: UpdateEvent<any>) {
        this.serverGateway.onRank();
    }
}
