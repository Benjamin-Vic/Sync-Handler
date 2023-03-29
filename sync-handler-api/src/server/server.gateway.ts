import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Player } from "src/player/player.entity";
import { PlayerService } from "src/player/player.service";
import { Rank } from "src/rank/rank.entity";
import { RankService } from "src/rank/rank.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ServerGateway {
    constructor(
        private readonly rankService: RankService,
        private readonly playerService: PlayerService
    ) { }

    @WebSocketServer()
    server: any;

    @SubscribeMessage('rank')
    async onRank(): Promise<void> {
        await this.sendRank();
    }

    @SubscribeMessage('player')
    async onPlayer(@MessageBody() uuid: string): Promise<void> {
        await this.sendPlayer(uuid);
    }

    async sendRank(): Promise<void> {
        this.server.emit('rank', await this.rankService.find());
    }

    async sendPlayer(uuid: string): Promise<void> {
        let player: Player | null = await this.playerService.findOne({ where: { uuid }, relations: ['rank'] })

        if (!player) {
            const rank: Rank | null = await this.rankService.findOne({ where: { name: 'default' } });
            if (rank) {
                await this.playerService.create({ uuid, rank: rank });
                player = await this.playerService.findOne({ where: { uuid }, relations: ['rank'] });
            }
        }

        this.server.emit('player', player);
    }

}
