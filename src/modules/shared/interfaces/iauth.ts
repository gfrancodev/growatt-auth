export interface IAuth {
  createAuth(data: Auth.Data): Promise<Auth.Response>;
  findOneAuth({ email, username }: Auth.Credentials): Promise<Auth.Response>;
  findById(id: string): Promise<Auth.Response>;
  findAllAuth(page: any, filter: string): Promise<unknown[]>;
  findByEmail(email: string): Promise<Auth.Response>;
  updateAuth(id: string, data: Record<string, unknown>): Promise<Auth.Response>;
}
