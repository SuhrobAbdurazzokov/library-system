import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IToken } from 'src/infrastructure/interface/token.interface';
export declare class TokenService {
    private readonly jwt;
    constructor(jwt: JwtService);
    refreshToken(payload: IToken): Promise<string>;
    accessToken(payload: IToken): Promise<string>;
    writeToCookie(res: Response, key: string, value: string, time: number): Promise<void>;
    verifyToken(token: string, secretKey: string): Promise<object>;
}
