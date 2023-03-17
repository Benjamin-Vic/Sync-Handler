import { IsString } from "class-validator";
import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString({
        message: "Name must be a valid string"
    })
    name: string;

    @IsEmail({}, {
        message: "Email must be a valid email"
    })
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
    password: string;
}
