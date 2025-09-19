export declare class CryptoService {
    encrypt(data: string): Promise<string>;
    decrypt(data: string, encryptedData: string): Promise<boolean>;
}
