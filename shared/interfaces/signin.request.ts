export interface SignInRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignInResponse {
    id: string,
    name: string,
    email: string,
    role: string,
    token: string,
    refreshToken: string
}