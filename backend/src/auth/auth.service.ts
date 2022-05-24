import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async signup(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = new User();
      user.hash = hash;
      user.email = dto.email;
      user.name = dto.name;
      await this.userRepository.save(user);
      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async signin(dto: SignInDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      const matchPSWRD = argon.verify(user.hash, dto.password);

      if (!matchPSWRD) throw new ForbiddenException('Credentials incorrect');

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = jwtConstants.secret;

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
