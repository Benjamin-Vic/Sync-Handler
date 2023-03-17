import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Permission } from './permission/permission.entity';
import { PermissionModule } from './permission/permission.module';
import { PermissionGroup } from './permission_group/permission_group.entity';
import { PermissionGroupModule } from './permission_group/permission_group.module';
import { Player } from './player/player.entity';
import { PlayerModule } from './player/player.module';
import { Rank } from './rank/rank.entity';
import { RankModule } from './rank/rank.module';
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
        entities: [User, Player, Rank, Permission, PermissionGroup],
        synchronize: configService.get("DB_SYNC") === "true"
      }), inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    PlayerModule,
    RankModule,
    PermissionModule,
    PermissionGroupModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
