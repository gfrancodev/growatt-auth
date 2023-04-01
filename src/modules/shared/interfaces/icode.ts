export interface ICode {
  createCode(data): Promise<Code.Response>;
  findOneCodeByUserId(user_id: string, code: string): Promise<Code.Response>;
  updateStatusCode(
    user_id: string,
    code: string,
    status: boolean,
  ): Promise<Code.Response>;
}
