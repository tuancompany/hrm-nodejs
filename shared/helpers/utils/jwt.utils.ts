import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import * as fs from "fs";

// https://www.ssh.com/academy/ssh/passphrase
export interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

export class JwtAuthentication {
  constructor() {}

  public generateToken({name, userId}: {name: string, userId: string}) {
    try {
      // Information to be encoded in the JWT
      const payload = {
        name,
        userId,
        accessTypes: [],
      };

      // Read private key value
      const privateKey = {
        key: fs.readFileSync("private.pem"),
        passphrase: "tuan12345",
      };
      const signOptions: SignOptions = {
        algorithm: "RS256",
        expiresIn: "1h",
      };

      // Generate JWT
      return sign(payload, privateKey, signOptions);
    } catch (e) {
      throw e;
    }
  }
  // string | Jwt | JwtPayload | undefined |
  public validateToken(token: string): Promise<TokenPayload> {
    const publicKey = fs.readFileSync("public.key");
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
