export interface IAuth {
    createAuth(data: Auth.Data): Promise<any>
    findOneAuth({ email, username }: Auth.Credentials): Promise<any>
}