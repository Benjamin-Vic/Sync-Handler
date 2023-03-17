import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    //
    // Validate
    //

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.userService.findOne({ where: { email } });

        if (user && (await bcrypt.compare(pass, <string>user.password))) {
            return user;
        }

        return null;
    }

    async validateToken(access_token: string): Promise<any> {
        try {
            return this.jwtService.verify(access_token, {
                secret: this.configService.get("JWT_SECRET")
            });
        } catch (error) {
            return null;
        }
    }

    //
    // Local
    //

    async login(res: Response, id: number): Promise<void> {
        res.cookie("access_token", this.jwtService.sign({ id }));
    }
}