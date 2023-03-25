import { Module } from "@nestjs/common";
import { QueryService } from "./query.service";

@Module({
    imports: [],
    controllers: [],
    providers: [QueryService],
    exports: [QueryService]
})

export class QueryModule { }
