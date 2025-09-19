import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CryptoService {
  async encrypt(data: string): Promise<string> {
    return hash(data, 8);
  }

  async decrypt(data: string, encryptedData: string): Promise<boolean> {
    return compare(data, encryptedData);
  }
}
