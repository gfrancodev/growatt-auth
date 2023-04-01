export interface IToken {
  createToken(data: any): Promise<unknown>;
  findOneToken(user_id: string, token: string): Promise<any>;
  updateStatusToken(user_id: string, status: boolean): Promise<any>;
  deleteToken(user_id: string, token: string): Promise<any>;
}
