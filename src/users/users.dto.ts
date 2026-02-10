import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty({ example: 'kikuk_afandi', description: 'Username unik' })
    username: string;

    @ApiProperty({ example: 'rahasia123', minLength: 5 })
    password: string;

    @ApiProperty({ example: 'Kikuk Afandi' })
    name: string;
}

export class LoginUserDto {
    @ApiProperty({ example: 'kikuk_afandi' })
    username: string;

    @ApiProperty({ example: 'rahasia123' })
    password: string;
}