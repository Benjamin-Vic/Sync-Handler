import { IsString } from "class-validator";
import { IsEmail, IsOptional, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsString({
        message: "Name must be a valid string"
    })
    @IsOptional()
    name: string;

    @IsEmail({}, {
        message: "Email must be a valid email"
    })
    @IsOptional()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: "Password must be a strong password"
    })
    @IsOptional()
    password: string;
}
