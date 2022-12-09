import {
  sign,
  SignOptions,
  verify,
  VerifyOptions
} from "jsonwebtoken";
import * as fs from "fs";

export interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

export class JwtAuthentication {
  constructor() {}

  public generateToken() {
    try {
      // Information to be encoded in the JWT
      const payload = {
        name: "Human Resources",
        userId: 123,
        accessTypes: [],
      };

      // Read private key value
      const privateKey = {
        key: fs.readFileSync(
            // path.join(__dirname, "./../private.pem")
            "private.pem"
          ),
        passphrase: 'tuan12345'
        // https://www.ssh.com/academy/ssh/passphrase
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
  public validateToken(
    token: string
  ): Promise<TokenPayload> {
    const publicKey = fs.readFileSync(
    //   path.join(__dirname, "./../public.key")
    "public.key"
    );
    const verifyOptions: VerifyOptions = {
      algorithms: ["RS256"],
    };

    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, (error, decoded: any) => {
          if (error) return reject(error);
    
          resolve(decoded);
        })
      });
  }
}
