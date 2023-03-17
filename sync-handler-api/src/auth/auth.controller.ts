import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard) @Post("login")
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
        await this.authService.login(res, (<any>req.user).id);
    }
}
