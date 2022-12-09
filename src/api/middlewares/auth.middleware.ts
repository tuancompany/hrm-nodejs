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
                let jwt = req.headers.authorization;

                // Verify request has token
                if(!jwt) {
                    throw API_ERROR.UNAUTHORIZED(null);
                }

                // Remove Bearer if using Bearer Authorization mechanism
                if(jwt.toLocaleLowerCase().startsWith('bearer')) {
                    jwt.slice('bearer'.length).trim();
                }

                // Verify token hasn't expired yet.
                const decodedToken: TokenPayload = await this.jwtAuthentication.validateToken(jwt);
                const hasAccessToEndpoint = allowedAccessTypes.some(
                    at => decodedToken.accessTypes.some(uat => uat === at)
                );

                if(!hasAccessToEndpoint) {
                    throw API_ERROR.UNAUTHORIZED('No enough privileges to access endpoint');
                }

                next();
            } catch (error: any) {
                if(error.name === 'TokenExpiredError') {
                    throw API_ERROR.UNAUTHORIZED('Expired token');
                }

                throw API_ERROR.INTERNAL_SERVER('Failed to authenticate user');
            }
        }
    }
}