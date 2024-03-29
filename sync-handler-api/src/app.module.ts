import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Player } from './player/player.entity';
import { PlayerModule } from './player/player.module';
import { Rank } from './rank/rank.entity';
import { RankModule } from './rank/rank.module';
import { ServerModule } from './server/server.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [User, Player, Rank],
        synchronize: configService.get("DB_SYNC") === "true",
      }), inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    PlayerModule,
    RankModule,
    ServerModule,
    SubscriberModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
