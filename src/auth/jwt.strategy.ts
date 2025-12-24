// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 從 HTTP 標頭中擷取 Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    });
  }

  // 驗證通過後，將 payload 傳遞到 request 中
  async validate(payload: any) {
    return { id: payload.sub, name: payload.name };
  }
}
