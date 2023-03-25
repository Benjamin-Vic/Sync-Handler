import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { QueryService } from "src/query/query.service";
import { FindManyOptions } from "typeorm";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly queryService: QueryService
    ) { }

    @Get("columns")
    async getColumns(): Promise<string[]> {
        const removed = ["password"];
        return (await this.userService.getColumns()).filter((column: string) => !removed.includes(column));
    }

    @Get()
    async findAll(@Query() query: any): Promise<[User[], number]> {
        const options: FindManyOptions<any> = this.queryService.parseFindAll(query, await this.getColumns());
        const users: User[] = await this.userService.find(options);
        return [users.map((user: User) => {
            delete user.password;
            return user;
        }), await this.userService.count(options.where ? { where: options.where } : {})];
    }

    @Get(":id")
    async findById(@Req() req: Request, @Param("id", ParseIntPipe) id: number): Promise<User | null> {
        const user: User | null = id === -1 ? <User>req.user : await this.userService.findOne({ where: [{ id }] });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        delete user.password;
        return user;
    }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<void> {
        if (await this.userService.findOne({ where: [{ email: dto.email }] })) {
            throw new BadRequestException("User email already exists");
        }

        await this.userService.create(dto);
    }

    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<void> {
        const user: User | null = await this.userService.findOne({ where: [{ id }] });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException("Empty request body");
        }

        if (dto.email && await this.userService.findOne({ where: [{ email: dto.email }] })) {
            throw new BadRequestException("User email already exists");
        }

        await this.userService.update(user, dto);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        const user: User | null = await this.userService.findOne({ where: [{ id }] });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if ((await this.userService.count()) === 1) {
            throw new BadRequestException("Cannot delete the last user");
        }

        await this.userService.delete(user);
    }
}
