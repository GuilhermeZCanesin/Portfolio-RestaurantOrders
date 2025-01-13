export interface UserRequestInterface extends AuthRequestInterface {
    name: string;
}

export interface AuthRequestInterface {
    email: string;
    password: string;
}