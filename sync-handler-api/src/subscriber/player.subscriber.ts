import { Player } from "src/player/player.entity";
import { ServerGateway } from "src/server/server.gateway";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class PlayerSubscriber implements EntitySubscriberInterface<Player> {
    constructor(
        dataSource: DataSource,
        private readonly serverGateway: ServerGateway
    ) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Player;
    }

    afterInsert(event: InsertEvent<any>) {
        this.serverGateway.onPlayer(event?.entity?.uuid);
    }

    afterUpdate(event: UpdateEvent<any>) {
        this.serverGateway.onPlayer(event?.entity?.uuid);
    }
}
