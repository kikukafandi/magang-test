import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import * as bcrypt from 'bcrypt';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserValidation } from './user.validation';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private jwtService: JwtService,
    ) { }

    async register(req: any) {
        this.logger.info(`Register new user with data: ${JSON.stringify(req.body)}`);

        // validate request body
        const registerReq = this.validationService.validate(
            UserValidation.REGISTER,
            req
        );
        // chek if username already exists
        const totalUserWithSameName = await this.prismaService.user.count({
            where: { username: registerReq.username },
        });

        if (totalUserWithSameName > 0) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }
        // hash password
        const passwordHash = await bcrypt.hash(registerReq.password, 10);
        // create new user
        const newUser = await this.prismaService.user.create({
            data: {
                username: registerReq.username,
                password: passwordHash,
                name: registerReq.name,
            },
        });

        this.logger.info(`User registered successfully with id: ${newUser.id}`);

        return {
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
        };
    }

    async login(req: any) {
        this.logger.info(`User login attempt with data: ${JSON.stringify(req.body)}`);
        
        // validate request body
        const loginReq = this.validationService.validate(
            UserValidation.LOGIN,
            req
        );

        // find user by username
        const user = await this.prismaService.user.findUnique({
            where: { username: loginReq.username },
        });
        
        if (!user) {
            throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(loginReq.password, user.password);
        
        if (!isPasswordValid) {
            throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
        }

        const payload = {
            username : user.username,
            name : user.name,
            sub : user.id,
        };

        const token = await this.jwtService.signAsync(payload);

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { token: token },
        });
        this.logger.info(`User logged in successfully with id: ${user.id}`);
        
        return {
            access_token: token,
        };
    }
}