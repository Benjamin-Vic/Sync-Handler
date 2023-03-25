import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QueryModule } from "src/query/query.module";
import { UserController } from "./user.constroller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        QueryModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule { }
