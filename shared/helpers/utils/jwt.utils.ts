import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import * as fs from "fs";
import {
  TOKEN_CONFIG,
} from "../../../shared/constants";

// https://www.ssh.com/academy/ssh/passphrase
export interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

export class JwtAuthentication {
  constructor() {}

  public generateToken({
    name,
    userId,
    accessTypes,
    expireTime
  }: {
    name: string;
    userId: string;
    accessTypes: string[];
    expireTime: string;
  }) {
    try {
      // Information to be encoded in the JWT
      const payload = {
        name,
        userId,
        accessTypes,
      };

      // Read private key value
      console.log('test private key', process.env.NODE_ENV === 'production' ? process.env.PRIVATE_KEY : fs.readFileSync("private.pem"))
      const privateKey = {
        key: process.env.NODE_ENV === 'production' ? process.env.PRIVATE_KEY : fs.readFileSync("private.pem"),
        passphrase: TOKEN_CONFIG.PASS_PHRASE,
      };
      const signOptions: SignOptions = {
        algorithm: "RS256",
        expiresIn: expireTime,
      };

      // Generate JWT
      return sign(payload, privateKey, signOptions);
    } catch (e) {
      throw e;
    }
  }
  // string | Jwt | JwtPayload | undefined |
  public validateToken(token: string): Promise<TokenPayload> {
    const publicKey = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_KEY : fs.readFileSync("public.pem");
    const verifyOptions: VerifyOptions = {
      algorithms: ["RS256"],
    };

    return new Promise((resolve, reject) => {
      verify(token, publicKey, verifyOptions, (error, decoded: any) => {
        if (error) return reject(error);

        resolve(decoded);
      });
    });
  }
}
