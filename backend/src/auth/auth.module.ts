import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
