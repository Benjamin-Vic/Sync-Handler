import { BadRequestException, Injectable } from "@nestjs/common";
import { Color } from "src/enum/color.enum";
import { Rank } from "src/rank/rank.entity";
import { FindManyOptions, Like } from "typeorm";

@Injectable()
export class QueryService {
    constructor() {
    }

    parseFindAll(query: any, columns: string[]): FindManyOptions<any> {
        const options: FindManyOptions<any> = { order: { id: "ASC" } };

        if (query.search && query.search.length > 0 && query.value && query.value.length > 0) {
            if (!columns.slice(1).includes(query.search)) {
                throw new BadRequestException("Invalid search column");
            }

            if (query.search === "chatColor") {
                if (Object.values(Color).includes(query.value)) {
                    options.where = {
                        [query.search]: query.value
                    };
                }
            } else if (query.search === "rank") {
                options.where = {
                    "rank": {
                        "name": Like(`%${query.value}%`)
                    }
                }
            } else {
                options.where = {
                    [query.search]: Like(`%${query.value}%`)
                };
            }
        }

        if (query.sort && query.sort.length > 0 && query.order && query.order.length > 0) {
            if (!columns.includes(query.sort)) {
                throw new BadRequestException("Invalid sort column");
            }

            if (!["ASC", "DESC"].includes(query.order)) {
                throw new BadRequestException("Invalid sort order");
            }

            options.order = {
                [query.sort]: query.order
            };
        }

        if (query.size) {
            if (isNaN(query.size)) {
                throw new BadRequestException("Invalid size");
            }

            if (![10, 25, 50, 100].includes(+query.size)) {
                throw new BadRequestException("Invalid size");
            }

            options.take = +query.size;
        } else {
            options.take = 10;
        }

        if (query.page) {
            if (isNaN(query.page)) {
                throw new BadRequestException("Invalid page");
            }

            if (+query.page < 0) {
                throw new BadRequestException("Invalid page");
            }

            options.skip = +query.page * options.take;
        }

        return options;
    }

}
