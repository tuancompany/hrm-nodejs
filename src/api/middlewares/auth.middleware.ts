import { Request, Response, NextFunction } from 'express';
import { JwtAuthentication, TokenPayload } from './../../../shared/helpers/utils/jwt.utils';
import { API_ERROR } from './../../../shared/constants';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */

export class AuthenticationMiddleware {
    private jwtAuthentication: JwtAuthentication
    constructor() {
        this.jwtAuthentication = new JwtAuthentication();
    }

    public authorize(allowedAccessTypes: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let jwt: string = req.headers.authorization;
                let token: string;

                // Verify request has token
                if(!jwt) {
                    res.json(API_ERROR.UNAUTHORIZED(null));
                }

                // Remove Bearer if using Bearer Authorization mechanism

                if(jwt.toLocaleLowerCase().startsWith('bearer')) {
                    token = jwt.slice('bearer'.length).trim();
                } else {
                    token = jwt;
                }

                // Verify token hasn't expired yet.
                const decodedToken: TokenPayload = await this.jwtAuthentication.validateToken(token);
                const hasAccessToEndpoint = allowedAccessTypes.some(
                    at => decodedToken.accessTypes.some(uat => uat === at)
                );

                if(!hasAccessToEndpoint) {
                    res.json(API_ERROR.UNAUTHORIZED('No enough privileges to access endpoint'));
                }

                next();
            } catch (error: any) {
                if(error.name === 'TokenExpiredError') {
                    res.json(API_ERROR.UNAUTHORIZED('Expired token'));
                }

                res.json(API_ERROR.INTERNAL_SERVER('Failed to authenticate user'))
            }
        }
    }
}