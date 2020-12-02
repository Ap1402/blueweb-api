import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
        private jwtService: JwtService
    ) { }

    async validateUser(userData: loginDto) {
        /*   const { value, error } = userSchema.validate(req.body, {
            context: { login: true },
          }); */
        const user = await this.usersRepository.findOne({
            include: [{ all: true, nested: true }],
            where: { username: userData.username },
        });

        if (user && user.comparePassword(userData.password)) {
            const { password, ...result } = user;
            return user
        }
        throw new HttpException('Hay un problema con su usuario o contraseña', HttpStatus.BAD_REQUEST)
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id, role: user.role.name, clientId: user.clientId };
        return {
            access_token: this.jwtService.sign(payload),
            role: user.role.name
        };
    }

};